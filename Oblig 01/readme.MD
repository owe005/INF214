## Task 1
For the first task I created a input field with a button that when clicked would execute my main() function.

- Initially I thought of using a for loop to loop through each element in the array and simplifying it using the API but that would mean we'd have to wait for each request. Afterwards I thought of maybe counting how many "n" times elements were in the array, then executing the function n times on each element. That would also mean they would have to wait for each request to complete.

I opted for using three functions instead. One to execute the simplification on each expression (main). One to keep track of how many times we're simplifying. (func) And lastly one to do the simplification. (simplifyExpr)

My main function loops through each expression in the input (n), and executes simplifyExpr on each element in the array.

My find(data) function receives data and splits all the expressions by delimiter ";" into an array. It'll loop through the amount of expressions in the array until there are no more. This is the function that my main() function is applying to the user input.

Lastly my simplifyExpr(n) function takes an "n" as input. (n being each expression found through my other two functions.) Then converts that expression into a browser-readable format, sends it to the API, waits for response, and that result is then formatted out to the user in a nice way! 

#
## Task 2
In order to change the program to only display the first simplification to complete (not necessarily the first in line) I immediately thought of using <i>Promises</i>. The method <b>Promise.race(iterable)</b> would do well here I believe as it takes multiple promises and only returns a single promise.. the first that settles. So the solution would be to run each promise for each expression inputted by the user, then run them in Promise.race() and the first one that completes, gets returned to the user.

I changed up some of my code to make this easier, as well as dropping my find() function and keeping it within my main() function instead. (I ran out of time for the assignment for changing task 1.)

My main() assigns the input from the user, splits the expressions into an array with delimiter ",". Then we have an empty promises array that we will fill up based on how many expressions!

We loop through each expression in the array (as long as there are available expressions), then it runs my other function simplifyExpr on each expression and pushes it into the array.

Afterwards it's time to race them! Whichever completes without error first gets returned to the user.

My simplifyExpr() function also changed to enable error handling.
It'll check if the response from the API isn't okay, in which it'll throw the status as an error message.

It'll also check if the output for the user contains a syntax error, in which it'll call that out. And catch any other errors afterwards.


#
## Task 3
On this task we want to apply a function on an iterable list. E.g [1,2,3]. The function could be for example x*x or x+1 as you can see tested in the code. Now, the function itmp:
- takes two parameters, <i>iterable_input</i> and <i>func_to_be_applied</i>. 
- Everytime <i>"next"</i> is called, we take the next element in the list. (First being [0]). 
- Once we have iterated through the array, we yield x and consider it "done" (The status on "done" changes from false to true.)

You can see this for when we try with [10, 20] and x => x times x.
The first console.log(p.next()) returns 100.
The second one returns 400.
Third time we try we don't have any more elements, and we return "Object { value: undefined, done: true }"
#
## Task 4
This task is all about finding the bug/the reason why <i>"result"</i> within the login function is returning <i>"undefined"</i>. Or rather.. why the promise from mongoose.find is returning <i>"undefined"</i>.

The function <i>login</i> would call the function <i>validateLogin</i>, in doing so it would pass the parameters <i>nameOrEmail</i> and <i>password</i>. Then the function <i>validateLogin</i> would return with a promise that the request resolved with an object stating whether or not the login was successful. 

The bug has to be within <i>validateLogin</i>. The first lines suggest validation of said parameters. On line 17, db.User.find() looks for a user within the mongoose database. It'll return with a promise with an object with a user. (given the parameters).

The problem is related to the fact that these two return statements are occuring in different functions. The return on line 31 is apart of a function from line 18-33, while the return on line 27 is within the function from line 23-28. These two returns are both reactions to two different promises. (return from db.User.find() and return from bcrypt.compare()).

With this information, we can look at line 18-19. If these lines are executed, the function mentioned earlier on lines 18-33 will implicitly return <i>"undefined"</i>. 

If you return the value of bcrypt.compare(), the problem will be resolved! 
#
## Task 5
See the ppx file within the folder "task 5" for the Powerpoint presentation. 