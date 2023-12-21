const Product = require('../models/product.model');
const axios = require('axios')

exports.allTransactions = async (req, res) => {
    const { month, search, page = 1, per_page = 10 } = req.query;

    try {
        // Parse the provided month to an integer
        const targetMonth = parseInt(month);

        if (isNaN(targetMonth) || targetMonth < 1 || targetMonth > 12) {
            return res.status(400).json({ error: 'Invalid month parameter' });
        }

        // Build the query based on the provided parameters
        const query = {
            $expr: {
                $eq: [{ $month: '$dateOfSale' }, targetMonth],
            },
            ...(search
                ? {
                    $or: [
                        { title: { $regex: new RegExp(search, 'i') } },
                        { description: { $regex: new RegExp(search, 'i') } },
                    ],
                }
                : {}),
        };

        // Handle the price field separately if search parameter is provided
        if (search) {
            // Check if the search parameter is a number
            const isNumeric = !isNaN(parseFloat(search)) && isFinite(search);

            if (isNumeric) {
                query.$or.push({ price: parseFloat(search) });
            }
        }

        // Fetch transactions from the database
        const totalTransactions = await Product.countDocuments(query);
        const paginatedTransactions = await Product.find(query)
            .skip((page - 1) * per_page)
            .limit(per_page);

        res.json({ transactions: paginatedTransactions, total: totalTransactions });
    } catch (error) {
        console.error('Error fetching transactions:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

exports.statistics = async (req, res) => {
    console.log(req.query);
    const { month } = req.query;
    console.log(month);

    try {
        // Parse the provided month to an integer
        const targetMonth = parseInt(month);

        if (isNaN(targetMonth) || targetMonth < 1 || targetMonth > 12) {
            return res.status(400).json({ error: 'Invalid month parameter' });
        }

        // Calculate statistics based on the provided month
        const totalSaleAmount = await Product.aggregate([
            {
                $match: {
                    $expr: {
                        $eq: [{ $month: '$dateOfSale' }, targetMonth],
                    },
                },
            },
            {
                $group: {
                    _id: null,
                    totalSaleAmount: { $sum: '$price' },
                    totalSoldItems: { $sum: { $cond: { if: '$sold', then: 1, else: 0 } } },
                    totalNotSoldItems: { $sum: { $cond: { if: '$sold', then: 0, else: 1 } } },
                },
            },
        ]);

        res.json({
            total_sale_amount: totalSaleAmount[0]?.totalSaleAmount || 0,
            total_sold_items: totalSaleAmount[0]?.totalSoldItems || 0,
            total_not_sold_items: totalSaleAmount[0]?.totalNotSoldItems || 0,
        });
    } catch (error) {
        console.error('Error calculating statistics:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

exports.barChart = async (req, res) => {
    const { month } = req.query;

    try {
        const targetMonth = parseInt(month);

        if (isNaN(targetMonth) || targetMonth < 1 || targetMonth > 12) {
            return res.status(400).json({ error: 'Invalid month parameter' });
        }

        const priceRanges = {
            '0-100': 0,
            '101-200': 0,
            '201-300': 0,
            '301-400': 0,
            '401-500': 0,
            '501-600': 0,
            '601-700': 0,
            '701-800': 0,
            '801-900': 0,
            '901-above': 0,
        };

        // Use aggregation pipeline to filter transactions based on the provided month
        const transactions = await Product.aggregate([
            {
                $match: {
                    $expr: {
                        $eq: [{ $month: '$dateOfSale' }, targetMonth],
                    },
                },
            },
        ]);

        transactions.forEach((transaction) => {
            const price = transaction.price;
            if (price <= 100) priceRanges['0-100']++;
            else if (price <= 200) priceRanges['101-200']++;
            else if (price <= 300) priceRanges['201-300']++;
            else if (price <= 400) priceRanges['301-400']++;
            else if (price <= 500) priceRanges['401-500']++;
            else if (price <= 600) priceRanges['501-600']++;
            else if (price <= 700) priceRanges['601-700']++;
            else if (price <= 800) priceRanges['701-800']++;
            else if (price <= 900) priceRanges['801-900']++;
            else priceRanges['901-above']++;
        });

        res.json(priceRanges);
    } catch (error) {
        console.error('Error calculating bar chart data:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

exports.pieChart = async (req, res) => {

    const { month } = req.query;

    try {
        const targetMonth = parseInt(month);

        if (isNaN(targetMonth) || targetMonth < 1 || targetMonth > 12) {
            return res.status(400).json({ error: 'Invalid month parameter' });
        }

        const categoryCounts = {};

        // Use aggregation pipeline to filter transactions based on the provided month
        const transactions = await Product.aggregate([
            {
                $match: {
                    $expr: {
                        $eq: [{ $month: '$dateOfSale' }, targetMonth],
                    },
                },
            },
        ]);

        transactions.forEach((transaction) => {
            const category = transaction.category;
            categoryCounts[category] = (categoryCounts[category] || 0) + 1;
        });

        res.json(categoryCounts);
    } catch (error) {
        console.error('Error calculating pie chart data:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}


async function fetchData(apiUrl) {
    try {
      const response = await axios.get(apiUrl);
      return response.data;
    } catch (error) {
      console.error(`Error fetching data from ${apiUrl}: ${error.message}`);
      return null;
    }
  }

exports.combinedData = async (req, res) => {
    const {month } = req.query;
    const api1Url = `http://localhost:5000/api/product/statistics?month=${month}`;
    const api2Url = `http://localhost:5000/api/product/bar-chart?month=${month}`;
    const api3Url = `http://localhost:5000/api/product/pie-chart?month=${month}`;
    console.log(api1Url)

    // Fetch data from all three APIs concurrently
    const [data1, data2, data3] = await Promise.all([
        fetchData(api1Url),
        fetchData(api2Url),
        fetchData(api3Url),
    ]);

    // Create a JSON object containing data from all APIs
    const combinedData = {
        statistics: data1,
        pieChart : data2,
        barChart : data3,
    };

    res.json(combinedData);
}