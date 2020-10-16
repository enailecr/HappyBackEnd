import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import Orphanage from '../models/Orphanage';

export default {
    async index(req: Request, res: Response) {
        const orphanageRepository = getRepository(Orphanage);
        const orphanages = await orphanageRepository.find();
        return res.status(200).json(orphanages);
    },
    
    async show(req: Request, res: Response) {
        const { id } = req.params;
        const orphanageRepository = getRepository(Orphanage);
        const orphanages = await orphanageRepository.findOneOrFail(id);
        return res.status(200).json(orphanages);
    },

    async create(req: Request, res: Response) {
        const {
            name,
            latitude,
            longitude,
            instructions,
            about,
            open_hours,
            open_on_weekends,
        } = req.body;
    
        const orphanageRepository = getRepository(Orphanage);
        const orphanage = orphanageRepository.create({
            name,
            latitude,
            longitude,
            instructions,
            about,
            open_hours,
            open_on_weekends,
        });
        await orphanageRepository.save(orphanage);
    
        return res.status(201).json(orphanage);
    }
}