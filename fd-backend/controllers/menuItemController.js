const MenuItem = require("../models/MenuItem");

// @desc   Create a new menu item
// @route  POST /api/menu-items
// @access Admin/Owner
exports.createMenuItem = async (req, res) => {
  try {
    const { name, description, price, category, imageUrl, available } =
      req.body;

    if (!name || !price) {
      return res.status(400).json({ message: "Name and price are required" });
    }

    const menuItem = new MenuItem({
      name,
      description,
      price,
      category: category || null,
      imageUrl,
      available: available ?? true,
    });

    await menuItem.save();
    res
      .status(201)
      .json({ message: "Menu item created successfully", menuItem });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc   Get all menu items
// @route  GET /api/menu-items
// @access Public
exports.getAllMenuItems = async (req, res) => {
  try {
    const menuItems = await MenuItem.find().populate("category", "name");
    res.json(menuItems);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc   Get single menu item
// @route  GET /api/menu-items/:id
// @access Public
exports.getMenuItemById = async (req, res) => {
  try {
    const menuItem = await MenuItem.findById(req.params.id).populate(
      "category",
      "name"
    );
    if (!menuItem)
      return res.status(404).json({ message: "Menu item not found" });
    res.json(menuItem);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc   Update menu item
// @route  PUT /api/menu-items/:id
// @access Admin/Owner
exports.updateMenuItem = async (req, res) => {
  try {
    const menuItem = await MenuItem.findById(req.params.id);
    if (!menuItem)
      return res.status(404).json({ message: "Menu item not found" });

    Object.assign(menuItem, req.body);
    await menuItem.save();

    res.json({ message: "Menu item updated successfully", menuItem });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc   Delete menu item
// @route  DELETE /api/menu-items/:id
// @access Admin/Owner
exports.deleteMenuItem = async (req, res) => {
  try {
    const menuItem = await MenuItem.findById(req.params.id);
    if (!menuItem)
      return res.status(404).json({ message: "Menu item not found" });

    await menuItem.deleteOne();
    res.json({ message: "Menu item deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc   Toggle availability
// @route  PATCH /api/menu-items/:id/availability
// @access Admin/Owner
exports.toggleAvailability = async (req, res) => {
  try {
    const menuItem = await MenuItem.findById(req.params.id);
    if (!menuItem)
      return res.status(404).json({ message: "Menu item not found" });

    menuItem.available = !menuItem.available;
    await menuItem.save();

    res.json({
      message: "Menu item availability updated",
      available: menuItem.available,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
