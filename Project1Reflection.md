The URL Shortening Application project included front-end development, API integration and state management with local storage. 
This process began with setting up the front-end with HTML and then moving onto the CSS to style it properly, ensuring it was as close as possible to 
the original in terms of style and responsiveness. JavaScript was used to handle the inputs, validation and the actual main feature which was being able to 
shorten URLs and copy them to your clipboard. The key part of this project was integrating the Bitly API which required the authentication via the Bearer token and handling asynchronous requests. 
The main challenges were getting the CSS correct and being able to match the style of the project, specifically the hero section picture and getting the buttons 
to the correct pill shape. I had to use an additional container for that image to get to look like it would in the final design and add the flex option as well. 
I ended up adding a bunch of red lines with the outline function to be able to see the element boundaries as part of debugging which allowed me to eventually find a 
solution for the hero image.  Figuring out the pill shape was also an issue, but the border radius and padding were the key to getting that shape. 
Another challenge was validating my URLs for the Bitly API. I ended up adding an error that would appear if you do not add the full link once
 I understood what was going on that way the user would know what was wrong as well. Adding clear error messages and visual cues was key to improving the form validation. 
For future improvements, I need to add a dynamic delete button, a clear all links button and figuring out a way to handle my bearer token 
without exposing it publicly are things I need to implement for this project. Adding user account integration to synchronize links across devices would also be ideal. 
This project strengthened my understanding of API integration and asynchronous practices. I think it was a valuable experience in understanding how to bring a third party service into a webapp. 
