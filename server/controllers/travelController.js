import Travel from "../Models/Travel.js";

export const getTravels = async (req, res) => {
  try {
    const travels = await Travel.find()
      .populate("author", "name email")
      .sort({ createdAt: -1 });
    res.status(200).json(travels);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getTravelById = async (req, res) => {
  try {
    const travel = await Travel.findById(req.params.id).populate("author", "name email");
    if (!travel) return res.status(404).json({ error: "Travel not found" });
    res.status(200).json(travel);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const addTravel = async (req, res) => {
  try {
    const { title, description, images, image } = req.body;
    const newTravel = new Travel({
      title,
      description,
      images: images || [],
      image: image || "",          // save the single image URL if provided
      author: req.user.id || req.user._id,
    });
    await newTravel.save();
    res.status(201).json(newTravel);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteTravel = async (req, res) => {
  try {
    const travel = await Travel.findById(req.params.id);
    if (!travel) return res.status(404).json({ error: "Travel not found" });

    await Travel.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Travel deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
