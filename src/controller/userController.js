
const Users = require("../models/student");

const registerUser = async (req, res) =>
{
    try
    {
        const user = new Users(req.body);
        const token = await user.generateAuthToken(); 
        const result = await user.save();
        return res.status(200).json({ message: "User registered successfully", success: true, result: result });

    } catch (error)
    {
        res.status(400).send(error);
    }
}

const getUsers = async (req, res) =>
{
    try
    {
        const result = await Users.find();
        return res.status(200).json({ message: "Users fetched successfully", success: true, result: result });
    } catch (error)
    {
        res.status(400).send(error);
    }
}

const getUserById = async (req, res) =>
{
    try
    {
        const _id = req.params.id
        const result = await Users.findById(_id);
        return res.status(200).json({ message: "User fetched successfully", success: true, result: result });
    } catch (error)
    {
        res.status(400).send(error);
    }
}

const getUserUpdate = async (req, res) =>
{
    try
    {
        const _id = req.params.id
        const result = await Users.findByIdAndUpdate(_id,
            { new: true })
            ;
        return res.status(200).json({ message: "User update successfully", success: true, result: result });
    } catch (error)
    {
        res.status(400).send(error);
    }
}

const deleteUser = async (req, res) =>
{
    try
    {
        const _id = req.params.id
        const result = await Users.findByIdAndDelete(_id);
            
        return res.status(200).json({ message: "User delete successfully", success: true, result: result });
    } catch (error)
    {
        res.status(400).send(error);
    }
}

// Login DRIVER API 
const loginUser = async (req, res) =>
{
    try
    {
        const contact_number = req.body.contact_number
        const password = req.body.password

        const user = await Users.findOne({ contact_number })
        if (!user)
        {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const passwordCheck = await bcrypt.compare(password, user.password)
        const token = await user.generateAuthToken(); 

        if (passwordCheck)
        {
            return res.status(200).json({ message: "Login succesfully" }).send(user)
        } else
        {
            return res.status(400).json({ message: "Invalid password" })
        }
    } catch (e)
    {
        res.status(500).send(e)
    }
}



module.exports = {
    registerUser,
    loginUser,
    getUsers,
    getUserById,
    getUserUpdate,
    deleteUser
}