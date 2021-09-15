const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017')
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.error('Could not connect to MongoDB...', err));

const authorSchema = new mongoose.Schema({
    name: String,
    bio: String,
    website: String
})

const Author = mongoose.model('Author', authorSchema);

const Course = mongoose.model('Course', new mongoose.Schema({
    name: String,
    author: {
        type: authorSchema,
        required: true
    }
}));

async function createAuthor(name, bio, website) {
    const author = new Author({
        name,
        bio,
        website
    });

    const result = await author.save();
    console.log(result);
}

async function createCourse(name, author) {
    const course = new Course({
        name,
        author
    });

    const result = await course.save();
    console.log(result);
}

async function listCourses() {
    const courses = await Course
        .find()
        .populate('author', 'name -_id')
        .select('name author');
    console.log(courses);
}

updateAuthor = async(courseId) => {
    const course = await Course.updateOne({ _id: courseId }, {
        $unset: {
            'author': ""
        }
    });
}

// createAuthor('Felix', 'My bio', 'My Website');

// createCourse('Node Course', new Author({ name: 'Felix' }))

updateAuthor('61420756f0ef892be37b859b');

// listCourses();