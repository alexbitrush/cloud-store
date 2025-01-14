const FileService = require("../routes/services/fileServices");
const File = require("../models/File");
const User = require("../models/User");
const config = require("config");
const fileServices = require("../routes/services/fileServices");
const fs = require('fs')

class FileController {
  async createDir(req, res) {
    try {
      const { name, type, parent } = req.body;
      const file = new File({ name, type, parent, user: req.user.id });
      const parentFile = await File.findOne({ _id: parent });
      if (!parentFile) {
        file.path = name;
        await fileServices.createDir(file);
      } else {
        file.path = `${parentFile.path}\\${file.name}`;
        await fileServices.createDir(file);
        parentFile.childs.push(file._id);
        await parentFile.save();
      }
      await file.save();
      return res.json(file);
    } catch (error) {
      return res.status(400).json(error);
    }
  }

  async getFile(req, res) {
    try {
      const files = await File.find({
        user: req.user.id,
        parent: req.query.parent,
      });
      return res.json(files);
    } catch (error) {
      return res.status(500).json({ message: "Error get files" });
    }
  }

  async uploadFile(req, res){
    try {
      const file = req.files.file

      const parent = await File.findOne({user: req.user.id, _id: req.body.parent})
      const user = await User.findOne({_id: req.user.id})
      if(user.usageDisk && file.size > user.diskSpace){
        return res.status(400).json({message: 'The user not have a disk space'})
      }
      user.usageDisk = file.size + user.usageDisk;

      let path;
      if(parent){
        path = `${config.get('filePath')}\\${user._id}\\${parent.path}\\${file.name}`
      } else {
        path = `${config.get('filePath')}\\${user._id}\\${file.name}`
      }

      if(fs.existsSync(path)){
        return res.status(400).json({message: 'The file alredy exist'})
      }

      file.mv(path);

      const type = file.name.split('.').pop();
      const dbFile = await new File({
        name: file.name,
        type,
        size: file.size,
        path: parent?.path,
        parent: parent?.id,
        user: user._id
      })

      await dbFile.save()
      await user.save()

      res.json(dbFile)
    } catch (error) {
      return res.status(500).json({ message: "Error upload file" });
    }
  }

  async downloadFile(req, res) {
    try {
        const file = await File.findOne({_id: req.query.id, user: req.user.id})
        const path = config.get('filePath') + '\\' + req.user.id + '\\' + file.path + '\\' + file.name
        if (fs.existsSync(path)) {
            return res.download(path, file.name)
        }
        return res.status(400).json({message: "Download error"})
    } catch (e) {
        console.log(e)
        res.status(500).json({message: "Download error"})
    }
}

}

module.exports = new FileController();
