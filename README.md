# Project Title : Energy visualizer 
Please refer to the file "User manual.pdf" for detailed instruction on how to install the project in your system.

### Software Engineering Project

```
SEMESTER : - FOURTH (SECOND YEAR)
```
```
Project Mentor – Nasalwai Nikhil Chakravarthy
```
```
Group No. - 57 Project No. - 32
```
```
Group Member’s Name Enrollment ID
Vasu Gupta      IIB2019003
Sandeep Kumar   IIB2019005
Ashish Tyagi    IIB2019016
Arvind Uikey    IIB2019013
```


## INDEX

1. Languages and Frameworks Used
2. Github Repo of Energy Visualizer
3. Pre-Requisites
4. Configuring MongoDB Database
    - Energy Database
    - Login Database
5. Setting up NodeJs Server
6. How to run the Project
    - User
    - Admin


#### Languages and Frameworks used

- MongoDB
- NodeJs
- Bootstrap
- Javascript
- HTML
- CSS

#### Pre-Requisites

1. Install MongoDB in your system. Installers are available at [Click
    here](https://www.mongodb.com/try/download) and [link](https://fastdl.mongodb.org/tools/db/mongodb-database-tools-windows-x86_64-100.3.1.zip) for MongoDB database tools.
2. Install NodeJS [Click here](https://nodejs.org/en/download/)
3. A terminal like GitBash,etc.
4. Write this commannd where you want your folder to be in your system
```
git clone https://github.com/sandy9808/Energy-visualizer.git
```


#### Configuring MongoDB Database

1. Make sure you have installed MongoDB and database tools.
2. Now open the Database folder in the project folder and copy the data.csv & mongoimport.exe and paste these files into this path- C:\Program Files\MongoDB\Server\4.4\bin

Energy Database

1. First make sure you have done 2nd point above.
2. Now, open Command prompt and type the command:-
```
cd C:\Program Files\MongoDB\Server\4.4\bin
```
3. Now, type this command in Command Prompt:-
```
mongoimport - d energy -c consumptions –type csv –file data.csv --headerline
```
4. The energy raw database will be imported now.
5. If there is some error you can watch this [video](https://www.youtube.com/watch?v=nuQD3Xfr0KY&t=167s).


Login Database

1. Open the terminal in two windows.
2. In the first window type mongod
3. When server is connected then in the second window type mongo
4. Now, run the following commands
```
use login
```

```
db.users.insertMany(

[

{username : "iib2019016", password : "iiita123", first : "Ashish", last : "Tyagi", email :
"iib2019016@iiita.ac.in", contact : "7811xxxx47", DOB : "2021- 04 - 26", age : "20", address : "ABC",
admin : 1 },

{username : "iib2019003", first : "Vasu", last : "Gupta", email : "iib2019003@iiita.ac.in", contact :
"7818896xxx", address : "ABC colony, XYZ city, India", password : "iiita123", DOB : "2021- 04 - 06",
admin : 0, _v : 0 },

{username : "iib2019005", first : "Sandeep", last : "Kumar", email : "iib2019005@iiita.ac.in", contact :
"7818896xxx", address : "ABC colony, XYZ city, India", password : "iiita123", DOB : "2021- 04 - 07",
admin : 0, _v : 0 }

]);
```

#### Setting up NodeJS Server

1. Make sure you have installed NodeJS
2. Open the terminal in the project folder
3. Run the following command in the terminal :-
    npm i
    node script.js
4. Now, the server will start on port number 3000.

#### How to run the project?

After setting up the server, open your web browser and go to https://localhost:3000. Then the login page will be displayed on the screen.

#### User

1. If the user is already registered, he can directly login by providing his
    username(you can use either of the username **iib2019003** or **iib2019005**) and password for both the usernames is **iiita123**.

2. Otherwise, the user can register himself by providing his personal
    details.
3. After login/sign-up, the user will be redirected to the homepage.
4. In the homepage the user has 4 options:-
    - Home
    - Profile
    - Graph
    - Logout
5. In the Profile section the personal details of the user will be displayed.
6. The user can change his personal details by clicking on the edit
    profile button.
7. Then the user can change the details he wants except the username
    and has to provide the password to save the changes.
8. After saving the changes the user will be directed back to his profile
    and the changes made by the user can be noticed in his personal
    profile.
9. In the Graph section the user has to provide the Start Date, Start
    time, End Date, End Time and Cost per Mega Watt to calculate the
    cost of total energy consumed then click on “Show Graph” button to
    see the graph of the selected data.


10. Then the user will be directed to a page where he can see the
    graph of the selected data with analysis of Total Energy
    Consumed, Maximum Energy and Minimum Energy usage in the
    selected data and Total cost.
11. If the user right clicks on the graph he gets the following options:-
    - View as PNG
    - Download PDF
    - Download SNG
    - Download CSV
    - Download XLS
    - View Data Table
    - Print Chart
    - View Source.
12. Logout.

#### Admin

1. Now, we will login as a admin into the system with
    username = iib2019016 and password = iiita123.
2. After logging in the admin will be redirected to the homepage.
3. In the homepage the user has 6 options:-
    - Home
    - Profile
    - Graph
    - Raw View
    - Raw Update
    - Logout
4. The admin has only 2 additional features Raw View and Raw Update
    and all other features are same as user.
5. In the Raw View section the admin can see the value of energy
    consumption of the selected date & time.


6. In the Raw Update section the admin can change the value of
    energy consumption of the selected date & time.
7. We will first discuss about Raw Update feature and afterwards Raw
    View feature.
8. In the Raw Update section, firstly the admin has to select the date
    and time at which he wants to change the value and then provide the
    new value and click on “Update” button. A dialog box will appear with
    message “Value Updated” on the screen.
9. In the Raw View section, firstly the admin has to select the date and
    time at which he wants to see the data and then click on “View Data”
    button. A dialog box will appear with message “Value is (value at
    selected date & time)” on the screen.
10. We can check these two first features by first changing the value at
    some date and time through Raw Update feature and then in Raw
    View section at same date and time we will see the same value in the
    dialog box which we had provided earlier as new value in Raw
    Update section.



