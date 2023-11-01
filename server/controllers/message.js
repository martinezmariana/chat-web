import Message from '../models/message.js';

const controller = {
  // Función para guardar un mensaje
  save: async (req, res) => {
    try {
      const params = req.body;
      const message = new Message();
      message.message = params.message;
      message.from = params.from;
      console.log(message);
      const messageStored = await message.save();
      
      return res.status(200).send({
        status: 'success',
        messageStored
      });
    } catch (error) {
      return res.status(404).send({
        status: 'error',
        message: 'No ha sido posible guardar el mensaje'
      });
    }
  },

  // Función para obtener los mensajes
  getMessages: async (req, res) => {
    try {
      const messages = await Message.find({}).sort('-_id').exec();

      if (messages.length === 0) {
        return res.status(404).send({
          status: 'error',
          message: 'No hay mensajes para mostrar'
        });
      }

      return res.status(200).send({
        status: 'success',
        messages
      });
    } catch (error) {
      return res.status(500).send({
        status: 'error',
        message: 'Error al extraer los datos'
      });
    }
  }
};

export default controller;
