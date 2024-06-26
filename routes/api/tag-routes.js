const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
    const tags = await Tag.findAll({
      include: { model: Product, through: ProductTag }
    });
    res.json(tags);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to get tags' });
  }
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    const tag = await Tag.findByPk(req.params.id, {
      include: { model: Product, through: ProductTag }
    });
    if (!tag) {
      return res.status(404).json({ message: 'Tag not found' });
    }
    res.json(tag);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to get tag' });
  }
});

router.post('/', async (req, res) => {
  // create a new tag
  try {
    const newTag = await Tag.create(req.body);
    res.status(201).json(newTag);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: 'Failed to create tag' });
  }
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  try {
    const [affectedRows] = await Tag.update(req.body, {
      where: { id: req.params.id }
    });
    if (affectedRows === 0) {
      return res.status(404).json({ message: 'Tag not found' });
    }
    res.status(200).json({ message: 'Tag updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: 'Failed to update tag' });
  }
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  try {
    const affectedRows = await Tag.destroy({
      where: { id: req.params.id }
    });
    if (affectedRows === 0) {
      return res.status(404).json({ message: 'Tag not found' });
    }
    res.status(200).json({ message: 'Tag deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to delete tag' });
  }
});

module.exports = router;
