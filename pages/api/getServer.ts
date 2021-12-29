import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>
) {
    if (req.method === 'GET') {
        const { ip } = req.query;

        let data;

        fetch(`https://api.mcsrvstat.us/2/${ip}`)
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                data = data;
            })
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });

        res.status(200).json(data);
    } else {
        res.status(500).json({ message: 'What are you doing here? 🤷‍♀️' });
    }
}
