import asyncHandler from '../middleware/asyncHandler.js';
import Publication from '../models/publicationModel.js';
import User from '../models/userModel.js';

// @desc Fetch All Publications
// @route GET /api/publications
// @access Private

const getPublications = asyncHandler(async (req, res) => {
  const publications = await Publication.find({}).populate('user', 'firstname lastname');
  res.json(publications);
});

// @desc Fetch A Publication
// @route GET /api/publications/:id
// @access Private

const getPublicationById = asyncHandler(async (req, res) => {
  const publication = await Publication.findById(req.params.id).populate('user', 'firstname lastname');

  if (publication) {
    return res.json(publication);
  } else {
    res.status(404);
    throw new Error('Resource not found');
  }
});

// @desc Create a publication
// @route POST /api/publications
// @access Private

const createPublication = asyncHandler(async (req, res) => {
  const { name, address, city, state, zipcode, parentPublication } = req.body;

  const publication = new Publication({
    user: req.user._id,
    name,
    address,
    city,
    state,
    zipcode,
    parentPublication: parentPublication || null
  });

  const createdPublication = await publication.save();
  res.status(201).json(createdPublication);
});

// @desc Update publication
// @route PUT /api/:id
// @access Private

const updatePublication = asyncHandler(async (req, res) => {
  const { name, address, city, state, zipcode, parentPublication, status } = req.body;

  const publication = await Publication.findById(req.params.id);

  if (publication) {
    ((publication.name = name), (publication.address = address), (publication.city = city), (publication.state = state), (publication.zipcode = zipcode), (publication.parentPublication = parentPublication || null), (publication.status = status));

    const updatePublication = await publication.save();
    res.json(updatePublication);
  }
});

// @desc Delete publication
// @route DELETE /api/:id
// @access Private

const deletePublication = asyncHandler(async (req, res) => {
  const publication = await Publication.findById(req.params.id);

  if (publication) {
    await publication.deleteOne({ _id: publication._id });
    res.status(200).json({ message: 'Publication removed.' });
  } else {
    throw new Error('Resource not found');
  }
});

// @desc Add publication note
// @route POST /api/:id/notes
// @access Private

const createPublicationNote = asyncHandler(async (req, res) => {
  const { content, noteType } = req.body;

  const publication = await Publication.findById(req.params.id);

  publication.notes.push({
    author: req.user._id,
    noteType,
    content
  });

  await publication.save();

  res.status(201).json(publication);
});

export { getPublications, getPublicationById, createPublication, updatePublication, createPublicationNote, deletePublication };
