import {Request, Response} from "express";
import walletModels from "../models/wallet.model";
import {Wallet} from "../types/Wallet";
import userModels from "../models/user.model";

const walletControllers = {
    async allWallets(req: Request, res: Response) {
        try {
            const wallets = await walletModels.getAllWallets();

            res.status(200).json(wallets.rows);
            return;
        } catch (error) {
            console.error(error);
            res.status(500).json({error});
            return;
        }
    },

    async walletByUserId(req: Request, res: Response) {
        const {userId} = req.params;

        if (!userId) {
            res.status(400).json({error: "One or more params are mising in URL"});
            return;
        }

        try {
            const wallet = await walletModels.getWalletByUserId(parseInt(userId));

            if (!wallet.rows[0]) {
                res.status(404).json({error: "Wallet not found"});
                return;
            }

            res.status(200).json(wallet.rows);
            return;
        } catch (error) {
            console.error(error);
            res.status(500).json({error});
            return;
        }
    },

    async updateAccountAmount(req: Request, res: Response) {
        const {userId} = req.params;
        const {amount} = req.body;

        if (!userId) {
            res.status(400).json({error: "One or more params are mising in URL"});
            return;
        }

        for (const key in req.body) {
            if (!req.body[key]) {
                res
                    .status(400)
                    .json({error: `Missing required field: ${key} in body`});
                return;
            }
        }

        try {
            const wallet = await walletModels.getWalletByUserId(parseInt(userId));
            const user = await userModels.getUserById(parseInt(userId));

            if (!wallet.rowCount) {
                res.status(404).json({error: "Wallet not found"});
                return;
            }
            const valuesArray = Object.values(wallet.rows[0]);
            const currentAccountAmount = valuesArray[2];
            const accountAmount = currentAccountAmount + parseInt(amount);

            const balance = await walletModels.updateAccountAmount(
                accountAmount,
                parseInt(userId)
            );

            res.status(200).json({data: balance});
            return;
        } catch (error) {
            console.error(error);
            res.status(500).json({error});
            return;
        }
    },

    async updateBtcAmount(req: Request, res: Response) {
        const {userId} = req.params;
        const {euroenmoinssurlecompte, btcAmount} = req.body;

        if (!userId) {
            res.status(400).json({error: "One or more params are mising in URL"});
            return;
        }

        for (const key in req.body) {
            if (!req.body[key]) {
                res
                    .status(400)
                    .json({error: `Missing required field: ${key} in body`});
                return;
            }
        }

        try {
            const wallet = await walletModels.getWalletByUserId(parseInt(userId));

            if (!wallet.rowCount) {
                res.status(404).json({error: "Wallet not found"});
                return;
            }

            // Ancien soldes du compte
            /*      const oldAccountAmount = wallet.rows[0].accountAmount;*/
            const walletValuesArray = Object.values(wallet.rows[0]);
            // Nouveau solde du compte
            const currentAccountAmount =
                walletValuesArray[2] - parseInt(euroenmoinssurlecompte);
            const balanceDollars = await walletModels.updateAccountAmount(
                currentAccountAmount,
                parseInt(userId)
            );

            const currentBtcAmount = walletValuesArray[3] + parseInt(btcAmount);
            const balance = await walletModels.updateBtcAmount(
                currentBtcAmount,
                parseInt(userId)
            );

            res.status(200).json({data: [balanceDollars, balance]});
            return;
        } catch (error) {
            console.error(error);
            res.status(500).json({error});
            return;
        }
    },
};

export default walletControllers;
