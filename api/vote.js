import { MongoClient } from 'mongodb';

export default async function handler(req, res) {
    const { choice } = req.query;

    if (!choice) {
        return res.status(400).json({ error: "No choice provided" });
    }

    const client = new MongoClient(process.env.MONGODB_URI);

    try {
        await client.connect();
        const db = client.db('valentine_stats');
        const collection = db.collection('clicks');

        await collection.insertOne({
            answer: choice,
            time: new Date()
        });

        return res.status(200).json({ message: "Success" });
    } catch (e) {
        return res.status(500).json({ error: e.message });
    } finally {
        await client.close();
    }
}