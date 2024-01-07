import { Request, Response } from "express";
import cryptosModels from "../models/cryptos.model";
import { Crypto } from "../types/crypto";

const articleControllers = {
    async createCrypto(req: Request, res: Response) {
        if (!req.body.cmid) {
            throw { status: 400, message: "cmid is missing in body" };
        }
        try {
            const crypto: Crypto = {
                id: req.body.cmid,
                name: '',
                currentPrice: 0,
                openingPrice: 0,
                lowestPrice: 0,
                highestPrice: 0,
                imageUrl: '',
                isvisibletoguests: true
            };
            await cryptosModels.create(crypto);
            res.status(200).json({ message: "Crypto created" });
        } catch (error) {
            console.error(error);
            const status = (error as { status?: number }).status || 500;
            res.status(status).json({ error });
        }
    },

    async getCryptos(req: Request, res: Response) {
        try {
          let cryptos: Crypto[];
          if (!req.query.cmids) {
            cryptos = await cryptosModels.getAll();
          } else {
            const cmids = req.query.cmids as string;
            cryptos = await cryptosModels.getBycmids(cmids);
          }
          if (cryptos.length === 0) {
            throw { status: 404, message: "Cryptos not found" };
          }
          if ( req.isGuest === true) {
            cryptos = cryptos.filter((cryptos) => cryptos.isvisibletoguests);
          }
          res.status(200).json(cryptos);
        } catch (error) {
          console.error(error);
          const status = (error as { status?: number }).status || 500;
          res.status(status).json({ error });
        }
      },

      async getCrypto(req: Request, res: Response) {
        if (!req.params.cmid) {
          throw { status: 400, message: "One or more params are missing in URL" };
        }
        try {
          const cmid = decodeURIComponent(req.params.cmid);
          const crypto = await cryptosModels.getBycmid(cmid);
          if (!crypto) {
            throw { status: 404, message: "Crypto not found" };
          }
          if ( req.isGuest === true && !crypto.isvisibletoguests) {
            throw { status: 401, message: "Unauthorized" };
          }
          res.status(200).json(crypto);
        } catch (error) {
          console.error(error);
          const status = (error as { status?: number }).status || 500;
          res.status(status).json({ error });
        }
      },

      async getCryptoHistory(req: Request, res: Response) {
        if (!req.params.cmid || !req.params.period) {
          throw { status: 400, message: "One or more params are missing in URL" };
        }
        try {
          const cmid = decodeURIComponent(req.params.cmid);
          const period = decodeURIComponent(req.params.period);
          let crypto = await cryptosModels.getCryptoHistory(cmid, period);
          if (!crypto) {
            throw { status: 404, message: "Crypto not found" };
          }
          if ( req.isGuest === true) {
            crypto = crypto.filter((crypto) => crypto.isvisibletoguests);
          }
          res.status(200).json(crypto);
        } catch (error) {
          console.error(error);
          const status = (error as { status?: number }).status || 500;
          res.status(status).json({ error });
        }
      },

      async deleteCrypto(req: Request, res: Response) {
        try {
          if (!req.params.id) {
            throw { status: 400, message: "One or more params are mising in URL" };
          }
          const id = decodeURIComponent(req.params.id);
          await cryptosModels.deleteCrypto(id);
          res.status(200).json({ message: "Crypto deleted" });
        } catch (error) {
          console.error(error);
          const status = (error as { status?: number }).status || 500;
          res.status(status).json({ error });
        }
      },

      async setVisibility(req: Request, res: Response): Promise<void> {
        if (!req.body.id || req.body.isVisibleToGuests === undefined) {
          throw { status: 400, message: "One or more params are mising in body" };
        }
        try {
          const id = decodeURIComponent(req.body.id);
          const isVisibleToGuests = req.body.isVisibleToGuests;
          await cryptosModels.setVisibility(id, isVisibleToGuests);
          res.status(200).json({ message: "Visibility updated" });
        } catch (error) {
          console.error(error);
          const status = (error as { status?: number }).status || 500;
          res.status(status).json({ error });
        }
      },
};

export default articleControllers;
