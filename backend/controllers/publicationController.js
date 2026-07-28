import { describe } from 'node:test';
import asyncHandler from '../middleware/asyncHandler.js';
import Publication from '../models/publicationModel.js';

// @desc Fetch All Publications
// @route GET /api/publications
// @access Private

const getPublications = asyncHandler(async (req, res) => {
  const publications = await Publication.find({});
  res.json(publications);
});

// @desc Fetch A Publication
// @route GET /api/publications/:id
// @access Private

const getPublicationById = asyncHandler(async (req, res) => {
  const publication = await Publication.findById(req.params.id);

  if (publication) {
    return res.json(publication);
  } else {
    res.status(404);
    throw new Error('Resource not found');
  }
});

export { getPublications, getPublicationById };
