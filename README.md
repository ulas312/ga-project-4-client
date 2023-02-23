## ![](https://ga-dash.s3.amazonaws.com/production/assets/logo-9f88ae6c9c3871690e33280fcf557f33.png)


## General Assembly, Software Engineering Immersive Project-4


## Solo project with a 7 day time frame. The project started when our daughter was born, due to this I only had 5 days left to finish the project before the deadline.


# Snkr Closet


## Overview


Our brief was to **create a full-stack app** which used **Python for back-end** and **React for front-end** with a **Django API** using **Django REST Framework** to serve your data from a Postgres database.




<p>Snkr Closet - an Instagram style app for sneaker collectors that gives the user their own profile page where they can see information like how many posts, followers and people they are following. They can also see their own sneaker posts. There is a feed that anyone can see and view sneakers, see the information uploaded and the comments section under each post.</p>


- Homepage - hero image/text that directs to the login page.
- Login/register pages - links between each if they need to register or just want to login. Once Logged in, it directs to the feed page.
- Feed page displaying all uploaded sneaker posts - username/pic of who posted, date posted, sneaker info with comment section.
- Profile page - user details and sneaker posts they've uploaded.
- Upload page - sneaker details form with image upload.


### Technical Requirements


- **Build a full-stack application** by making your own backend and your own front-end
- **Use a Python Django API** using Django REST Framework to serve your data from a Postgres database
- **Consume your API with a separate front-end** built with React
- **Be a complete product** which most likely means multiple relationships and CRUD functionality for at least a couple of models
- **Have a visually impressive design**


---


## Technologies used


- HTML5
- SCSS
- JavaScript (ES6)
- React
- Python
- NPM
- Django
- JSON
- JSON Web Tokens
- PostgreSQL
- Axios
- MUI
- Postman
- TablePlus
- Git and GitHub
- Heroku
- Cloudinary
- Adobe Illustrator


---


## Deployment


Visit the site here - [Snkr Closet](https://snker-closet-frontend.netlify.app/)


Visit the backend - [Repo here](https://github.com/ulas312/ga-project-4-api)


---


![Snkr Closet quick walkthrough](https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExM2Q4M2E2YjVkYTcyNGUzZWY4MGZjNjEwNTVlZjkzOWYzY2YzNzRjZSZjdD1n/FiqP92DzPISSvmE9BR/giphy.gif)


---


## Planning Process


- I started off by thinking about the back-end models and relationships. I planned as much of the back-end as I could and then started the Django setup.


- Next I created a quick wireframe of the front-end of the app to guide the user's journey and core functionality of the site and have something to work off once I started to build it.


![wireframes](https://i.postimg.cc/kXX1rWS1/Screenshot-2023-02-15-at-21-47-19.png)


---


## Build Process


- I got started on the back-end and spent about a day and a half building models, adding the user model using JSON Web Token, views and serializers. I then used Django admin Postman to test my end points.


![Postman](https://i.postimg.cc/R0JBmd72/Screenshot-2023-02-22-at-14-47-59.png)


- I then created seeds data for some sneakers, which I then converted to JSON and re-seeded into the working backend. Added a Bash Script to make seeds and seed when commanded to save time.


```python
#!/bin/bash


echo "dropping database django-sneakers"
dropdb django-sneakers


echo "creating database django-sneakers"
createdb django-sneakers


python3 manage.py makemigrations


python3 manage.py migrate


echo "inserting users"
python3 manage.py loaddata jwt_auth/seeds.json


echo "inserting brands"
python3 manage.py loaddata brands/seeds.json


echo "inserting sneakerModels"
python3 manage.py loaddata sneakerModels/seeds.json


echo "inserting comments"
python3 manage.py loaddata comments/seeds.json


```


- I also checked that the database was set up and seeded correctly with TablePlus.


![TablePlus](https://i.postimg.cc/y6G6MJCJ/Screenshot-2023-02-22-at-14-25-04.png)


- Once the basic functionality of the back-end was set up and my endpoints were working I moved onto the front-end and created my React app with npx create-react-app.


- After setting up the front-end structure. I connect the back-end and front-end.


- I built out the front-end functionality and design and utilised MUI components and created a theme to make styling quicker.


```javascript
const theme = createTheme({
 palette: {
   type: 'light',
   primary: {
     main: '#000000',
   },
   secondary: {
     main: '#ff0000',
   },
   background: {
     default: '#121212',
     paper: '#fff',
   },
   warning: {
     main: '#ffffff',
   },
 },
 typography: {
   fontFamily: '"Bebas Neue", "Helvetica", "Arial", sans-serif',
   fontSize: 25,
 },
});
```




### Features


This piece of code is for authorization for logging and registering functionality. When a user is logged in, each subsequent request will include the JWT, allowing the user to access routes, services, and resources that are permitted with that token.


```python
class RegisterView(APIView):
   def post(self, request):
       user_to_create = UserSerializer(data=request.data)
       if user_to_create.is_valid():
           user_to_create.save()
           return Response({'message': "Registration Successful"}, status=status.HTTP_201_CREATED)
       return Response(user_to_create.errors, status=status.HTTP_422_UNPROCESSABLE_ENTITY)




class LoginView(APIView):
   def post(self, request):
       email = request.data.get('email')
       password = request.data.get('password')
       try:
           user_to_login = User.objects.get(email=email)
       except User.DoesNotExist:
           raise PermissionDenied(detail='Invalid Credentials')
       if not user_to_login.check_password(password):
           raise PermissionDenied(detail='Invalid Credentials')


       dt = datetime.now() + timedelta(days=7) #7 days for testing


       token = jwt.encode(
           {'sub': user_to_login.id, 'exp': int(dt.strftime('%s'))},
           settings.SECRET_KEY,
           algorithm='HS256'
       )


       return Response({'token': token, 'message': f"Welcome back {user_to_login.username}"})


```


<p>This piece of code is the models for sneakers and what information is needed.</p>


```python
class SneakerModels(models.Model):
   brand = models.ManyToManyField(
       'brands.Brand', related_name="models",  blank=True)
   model = models.CharField(max_length=100)
   name = models.CharField(max_length=100)
   colorway = models.CharField(max_length=100)
   size = models.CharField(max_length=20)
   release_year = models.CharField(max_length=20)
   retail_price = models.CharField(max_length=20)
   cover_image = models.CharField(max_length=300)
   owner = models.ForeignKey(
       'jwt_auth.User',
       related_name="albums",
       on_delete=models.CASCADE
   )


   def __str__(self):
       return f"{self.brand} - {self.model} - {self.name} - {self.colorway} - {self.size} - {self.release_year} - {self.retail_price}"


```


---


## Styling


- The majority of the styling and responsiveness for the app was handled using MUI.
- I used CSS/Sass to overwrite some of the MUI stylings for customisation.


<h4><u>Screenshots</u><h4/>


![Snkr Closet home page](https://i.postimg.cc/TPVcJT7Z/Screenshot-2023-02-06-at-22-59-13.png)


![Register](https://i.postimg.cc/4dMfCp4r/Screenshot-2023-02-16-at-02-32-00.png)


![Login](https://i.postimg.cc/yYRdHpZn/Screenshot-2023-02-16-at-02-32-10.png)


![Profile page](https://i.postimg.cc/DfXJvzVq/Screenshot-2023-02-16-at-02-31-04.png)


![sneaker post card](https://i.postimg.cc/0ybqvbFv/Screenshot-2023-02-16-at-02-29-46.png)


---


## Wins & Challenges


### Wins


<p>Considering my time constraints for this project I was pleased with how it turned out and what I achieved and learnt with Python.</p>


<p>Using MUI for this project I feel a lot more confident with it and can use it to match my designs.</p>


### Challenges


<p>I should have taken a little more time with testing the data coming back to my end points. I found a mistake in one of the backend models and this meant I had to go through and change it which ate up a lot of time.</p>


<p>Another challenge was Cloudinary. I can successfully upload images but when they get pulled back there is an error. After searching online I figured I may not have installed the right Cloudinary packages which is why I was getting the errors. If I had more I could've figured this out sooner and tried to fix it.</p>


```javascript
npm i @cloudinary/url-gen @cloudinary/react


```


## Future Features


- Fix Cloudinary for pulling images.
- Clean up styling and make it mobile responsive.
- Finish up comments.
- Add notifications and messages.



