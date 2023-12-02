<h2>What is React</h2>
<p>React is Javascript library, which was built by Meta formerly Facebook to build front end of a web application. React is composable, declarative, Component based library which we can use to build a Single Page Applications which are highly scalable and is actively maintained by a huge developer community. </p>

<h2>What is JSX?</h2>
<p>JSX stands for Javascript XML, it is a flavour of JS which looks like HTML and with this way React was made declarative. 
JSX returns plain JavaScript objects. 
There are certain things we need to take care of using JSX like instead of class we write className.</p>

<h2>What is Babel</h2>
<p>Babel is a transpiler to compile JSX code so that the browser can understand the html. JSX returns objects that react can interpret and create actual elements.
With JSX we have to ensure that we are returning a single element. Thus we have to wrap the elements in a single parent element.</p>

<h2>What is a Virtual DOM?</h2>
<p>When our application starts React takes the component tree and Builds a JavaScript Data structure called virtual DOM. It is a lightweight in memory representation of our Component tree where each node represents component and its properties. When the state or data of the component changes, React updates that corresponding node in the virtual DOM to reflect the new state. Then it compares the current version of the DOM with its previous version to identify the nodes that should be updated and then finally those nodes are updated in the actual DOM. Technically the updation of DOM is not done by the React itself, but it is done by the library React DOM </p>

<h2>Easiest way to write React code:</h2>

```ReactDOM.render(<h1>Hello World</h1>, document.getElementById(‘root’))```

Where we define the div in the index.html file whose id we set to root, and with this we are telling react to render H1 tag in that div</p>

<h2>How is React different than a vanilla Javascript?</h2>
In react we like code like this:

```
ReactDOM.render(<h1 className="header">Hello, React!</h1>, document.getElementById("root"))
```
This is an declarative way of coding…
While as the same code to be written in vanilla javascript involves many lines of code

```
Const h1 = document.createElement(“h1”);
h1.textContent= “Hello World”
document.getElementById(‘root’).append(h1)
```

With this approach even if we add more elements you can see how many lines of code are going to be added and how complex the things would be.

<h2>Why do we need `import React from “react”`?</h2>
<p>React is what defines JSX, so in order to use  JSX we need to import React.</p>

<h2>What are Components?</h2>
<p>Components are basically functions which return react elements. We can use over and over again thus helping in code reusability. React allows us to create the functions for the user interfaces that we can use over and over again. We use Pascal Case while naming the components i.e., Capitalise the first letter of the name. Also Components help us to organise the code 
We define functions/ components as :</p>

```
function MyComponent(){
	return(
		<div>
			Some code
		</div>
  )
}
```
And then use Component as:
```
ReactDOM.render(<MyComponent />, document.getElementById(‘root’))
```

<h2>What are Parent Components and Child Components?</h2>
<p>Parent Components are those components in which we render other components and those components are called Child Components. In below example, Page is a Parent Component while as Header, Main Content and Footer are the child components. </p>

```
function Page() {
    return (
        <div>
            <Header />
            <MainContent />
            <Footer />
        </div>
    )
}
```

<h2>How do we Style React Components?</h2>
<p>In React we use className instead of class and rest is same as we use in normal html and CSS e.g.,

```
<nav className="nav">
```
And then in CSS we can give the styling to the nav class</p>

<h2>::marker Pseudo element</h2>
<p>This pseudo element is used to select the box of a list item, which typically contains the bulls or number. This property is used to target the list items like changing the colour and resizing the font size.</p>

<h2>What are Props?</h2>
<p>Props are the properties or attributes, that help us to reuse the components.  Props are the inputs or arguments to a component. Props are immutable(read only). Anytime there is a change in the Props, React re renders the component and updates the DOM accordingly. 
<p>Syntax of Props are:</p>
<b>Passing Props into a component:</b>
</p>

```
<Contact 
                img="./images/mr-whiskerson.png" 
                name="Mr. Whiskerson"
                phone="(212) 555-1234"
                email="mr.whiskaz@catnap.meow"
            />
```
<b>Receiving Props in Component</b>

```
export default function Contact(
    return (
        <div className="contact-card">
            <img src={props.img}/>
            <h3>{props.name}</h3>
            <div className="info-group">
                <img src="./images/phone-icon.png" />
                <p>{props.phone}</p>
            </div>
            <div className="info-group">
                <img src="./images/mail-icon.png" />
                <p>{props.email}</p>
            </div>
        </div>
    )
}
```
<p><i>Here Img, name, phone and email are the props</i></p>

<h2>What does the `.map()` array method do?</h2>
<p>Returns a new array. Whatever gets returned from the callback function provided is placed at the same index in the new array.
Usually we take the items from the original array and modify them in some way</p>

<h2>What do we usually use `.map()` for in React?</h2>
<p>Convert an array of raw data into an array of JSX elements that can be displayed on the page. </p>

<h2>Why is using `.map()` better than just creating the components manually by typing them out?</h2>
<p>It makes our code more "self-sustaining" - not requiring additional changes whenever the data changes.</p>

<h2>What is State in React?</h2>
<p>State in React is the way through which we can update the components.
We use React.useState(); to use the state hook. Whatever we put inside of the parenthesis is the first value or initial value of the state.
	State is an array with two values: [initial value, Function].
</p>

<h2> What is the difference between Props and State?</h2>
<h4>Props:</h4>
<p> Props refers to the properties which are passed to the component in order for it to work correctly. It is similar to how function receives the parameters. **Props** are immutable i.e., a Component that receives the props is not allowed to modify the props.<br>
Lets take a look at the below function.

 ```
	function addTwoNumbers(a, b){
		retun a + b;
	}
	addTwoNumbers(5, 8);
 ```
In the above function we add two number 5 and 8 by passing it to the function as parameters. Our result would be 13.
However, if we explicity define the value of a or be like a = 45; and then return the a + b, the result for the addTwoNumbers(5, 8) would be 53.
Thus, even though we are expecting a result 13 we would get 53 which is not correct.
Thus this way we create our Components reusable.
</p>
<h4>State: </h4>
<p>
State referes to the values that are managed by the component just like the variables that are declared inside the function. Anytime you have changing values that should be displayed or saved, you should use State. State is mutable unlike Props.
</p>

<h2>How do you pass the data from one component to the other?</h2>
<p>We Cannot directly pass the state from one component to another. We cannot even Pass the data from One Sibling to another Sibling Component.
In order to Pass the data from one Component to another <strong>We lift the state up to the nearest parent</strong>. And then from the parent to the Sibling components we pass the data through the props.
</p>

<h2>What is Reducer?</h2>
<p>Reducer is a function, that allows us to us to centralize the state updates in a component</p>

<h2>What are Side Effects?</h2>
<p><b>The Primary Tasks of React are :</b>
<ul>
	<li>Work with the DOM/Browser to render UI to the page </li>
	<li>Manage state for us between the render cycles (i.e., state renders are remembered from one render to another) </li>
	<li>Keep the UI updated whenever state change occurs</li>
</ul>
<b>The tasks which React cannot handle are: </b> 
	<ul>
		<li><b>Side Effects:</b>Anything that lives outside the React application e.g., Access to local Storage, API/ Database interaction, Subscriptions e.g., (web sockets), Syncing two different internal states together</li>
	</ul>
<i>So Side Effects are basically anything react is not incharge of.</i>
</p>

<h2>What is useEffect or Effect Hook?</h2>
<p>It is a hook provided by React, that allows us to perform <b>Side Effects</b> i.e, allows us to interact with outside API's or local storage</p>
<p> useEffect has two parameters: <i> one parameter is a Required parameter which is a callback function, where we put our sideeffect code and another one is optional parameter </i></p>
<b>syntax:</b> 

```
	useEffect(()=>{
		// function
	},[])
 ```
Any code that we put within the useEffect function is guaranteed to run after the component has rendered.

<h2>What is Strict Mode?</h2>
<p>
StrictMode is a tool for highlighting potential problems in an application. Like Fragment, StrictMode does not render any visible UI. It activates additional checks and warnings for its descendants.
<i><strong>Note:</strong>strong> Strict mode checks are run in development mode only; they do not impact the production build</i>.
</p>
