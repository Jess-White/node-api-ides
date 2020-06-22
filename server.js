import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';

import List from './models/List';


const app = express();
const router = express.Router();

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('');
const connection = mongoose.connection;

connection.once('open', () => {
  console.log('Mongo DB database connection established successfully!');
});

router.route('/lists').get((req, res) => {
  List.find((err, lists) => {
    if (err)
      console.log(err);
    else 
      res.json(lists);
  });

});

router.route('/lists/:id').get((req, res) => {
  List.findById(req.params.id, (err, list) => {
    if (err)
      console.log(err);
    else
      res.json(list);
  });
});

router.route('/lists/add').post((req, res) => {
  let list = new List(req.body);
  list.save()
    .then(list => {
      res.status(200).json({'list': 'Added successfully'});
    });
    .catch(err => {
      res.status(400).send('Failed to create a new record');
    });
});

router.route('/lists/update/:id').post((req, res) => {
  List.findById(req.params.id, (err, list) => {
    if (!list) {
      return next(new Error('Could not load document'));
    } else {
      list.name = req.body.name;
      list.shift = req.body.shift;

      list.save().then(list = {
        res.json('Update done');
      }).catch(err => {
        res.status(400).send('Update failed');
      });
    }
  });
});

router.route('/lists/delete/:id').get((req, res) => {
  List.findByIdAndRemove({_id: req.params.id}, (err, issue) => {
    if (err)
      res.json
  })
})

app.use('/', router);



app.get('/', (req, res) => res.send('Hello World'));

app.listen(3000, () => console.log('Express server running on port 3000'));

