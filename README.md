# Book List
Book list is an app designed to help college students buy and sell textbooks to eachother. We hope that this this project will make college a bit more affordable and a bit less stressful. Book list allows for students to take advantage of private market re-sell values such that textbooks specific to a university are available for sale at below retail prices, and, students have the opportunity of reselling their textbooks for a higher price than what the University or textbook distributor would have given them. For example, the loose paper chemistry textbook at CU costs roughly $40 but, the University will refuse to buy it back from the student after purchase. However with Book list a student would have the opportunity to resell this textbook andt the buying party, likely another student, would be given the opportunity to buy this textbook at a fraction of the price they would have paid through CU or some other textbook service.

## Getting Started
### Dependencies
Before running Book List, you'll need to have nodejs installed as well as npm. If you're planning on running the code in a simulator, you'll need to have a simulator installed.

#### OS X
To install the dependencies in OS X, make sure you have XCode installed as well has brew. Then run:
```
brew install Watchman npm
```

### Installing

To download Book List, navigate in a terminal to the destination directory, then clone the repo, then use `npm install` to install the required node.js modules. Make sure that this version of npm is not the beta version as this caused troubles in the past for running BookList. Then simply enter the booklist project file through terminal and type `expo start`. Your browser will open and re-direct you to a metro bundler where you can select whether you want to run Book List on your personal device using the QR code, or on your computer using a simulator. 

# Project Organization
All of the code is in the `components` directory. Here's a list of what is in each file:
- Account.js - Code for the screen displaying account info and allowing the user to navigate to the "My listings" screen
- Firebase.js - Firebase metadata
- Login.js - login/account creation screen
- Mybooks.js - Container for the screen that displays the books that a user is currently trying to sell
- MybooksBody.js - The actual content to display the user's books
- Search.js - wrapper for searching for a textbook. Contains the search bar at the top, and passes the text from the search bar to the SearchBody.
- SearchBody.js - does the actual search and displays matching textbooks
- Sell.js - Screen to sell a new textbook
- messages.js - Partially working messaging screen for realtime communication between users