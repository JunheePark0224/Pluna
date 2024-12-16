# Pluna 🌙

![Pluna Logo](./client/src/assets/logo.png)

**Personalized Learning Routine Generator**  
A web application designed to create customized learning routines based on students' goals, schedules, and preferences. Pluna offers a dynamic calendar interface, learning progress visualization, and advanced features to optimize study plans for students of all levels.

---

## 🌟 Features

### **Basic Version**
- **Input Fields**:
  - **Required**: Subject, Concepts, Difficulty level (multiple selection allowed)
  - **Optional**: 
    - Exam scope and date
    - Study style (e.g., short vs. long focus sessions)
    - Break preferences (e.g., short vs. long breaks)
    - Daily study goals (e.g., hours per day)
    - Personal schedule (e.g., school/academy schedule and available time slots)
    - Weekend preferences (e.g., more focused study sessions on weekends)

- **Output**:
  - Personalized learning plans in a **calendar/timetable format** based on input data.
  - Plans are fully editable by the user.
  - Users can add additional events to the calendar.

- **Key Features**:
  - Progress Tracking:
    - Mark completed tasks and visualize progress with dynamic indicators (e.g., completed blocks turn blue, incomplete ones remain gray).
  - Learning Statistics:
    - Weekly or monthly study analytics based on progress tracking.
  - **Social Sharing**:
    - Share your learning routine with friends.

---

### **Pro Version** (Includes all Basic features plus):
- **Mock Exam Integration**:
  - For high school students, add mock exam details and track incorrect answers to generate tailored study plans.
  - Includes interactive input for selecting specific mock exams and marking incorrect questions.
- **Enhanced UI**:
  - A visually engaging calendar interface with weather-based backgrounds.
  - Customizable calendar themes for personalization.

---

## 🎯 Target Audience
Pluna is designed for **all students**, regardless of their exam preparation stage, to help them organize their study schedules effectively.

---

## 🖼️ User Interface
- **Dynamic Calendar**:
  - Automatically adjusts study plans based on user input.
  - Fully customizable and interactive.
- **Progress Visualization**:
  - Color-coded progress indicators for tracking daily achievements.

---

## 🚀 How to Use
1. **Sign Up**: Create an account and input your study preferences.
2. **Generate Study Plan**: Enter the required information and get a personalized calendar.
3. **Track Progress**: Mark tasks as complete and monitor your study progress.
4. **Customize**: Adjust your calendar and add new events as needed.
5. **Upgrade to Pro**: Access advanced features like mock exam tracking and enhanced themes.

---

## 🖥️ Tech Stack
- **Frontend**: React.js
- **Backend**: Node.js
- **Database**: MySQL
- **Additional Tools**: GitHub Actions for CI/CD

---

## 🌌 Project Philosophy
Pluna offers a straightforward yet powerful platform designed to craft personalized and adaptable study routines. Tailored for students with varying schedules and objectives, our philosophy emphasizes flexibility and ease of use. Pluna steers clear of imposing rigid structures, instead empowering users to tailor their study plans and schedules according to their individual preferences and learning styles. Key features such as progress tracking and visual representations of plans ensure an engaging and productive learning journey.

---

## 🛠️ Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/JunheePark0224/Pluna.git
   cd Pluna
   npm install
   npm start
   ```
   
## 💻 How to Contribute to Pluna
Thank you for your interest in contributing to Pluna! To set up the project locally and get started, follow these steps:

### 1. Prerequisites
Ensure you have the following installed:

Node.js (v14+ recommended): Download Node.js
npm (Node Package Manager, included with Node.js)
MySQL (v8.0+): Download MySQL

### 2. Project Setup
2-1. Clone the Repository
     Clone the project repository to your local machine:
     git clone https://github.com/your-repository/pluna.git
     cd pluna

2-2. Install Dependencies
     Run the following command to install required packages:
     npm install

2-3. Set Up the Database

Install and configure MySQL.
Create a database:
sql

CREATE DATABASE pluna;
Update the MySQL credentials in server/config/db.js:
javascript

module.exports = {
  host: 'localhost',
  user: 'root',
  password: 'your_password', // Replace with your MySQL password
  database: 'pluna',
};
Run Database Migrations (Optional)
If you use migration scripts, run:


npm run migrate
Start the Server
Run the project:


node app.js
OR if using scripts:


npm start
Access the Application
Open your browser and navigate to:
http://localhost:3001

### 3. Contribution Workflow
Fork this repository to your GitHub account.
Create a new branch for your feature/bugfix:

git checkout -b feature/your-feature-name
Make changes and commit:

git add .
git commit -m "Add your meaningful commit message"
Push to your branch:

git push origin feature/your-feature-name
Submit a Pull Request (PR) on GitHub.

### 4. Notes for Contributors
Follow Code Standards: Ensure your code passes lint checks and follows project conventions.
Environment Variables: Add your own .env file based on example.env if required.
Testing: Run tests before submitting your PR:

npm test
### 5. Troubleshooting
If you face any issues during setup:

Ensure MySQL is running on port 3306.
Check your node_modules by reinstalling:

rm -rf node_modules
npm install
Verify database credentials in config/db.js.
For additional help, open an issue on GitHub.

### Happy Coding! 🚀
Thank you for contributing to Pluna!

## 📄 License
This project is licensed under the MIT License. See the [LICENSE](./LICENSE) file for details.

## 📧 Contact
For questions or suggestions, feel free to reach out via [GitHub Issues](https://github.com/JunheePark0224/Pluna/issues).
