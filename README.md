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

```ReactDOM.render(<h1 className="header">Hello, React!</h1>, document.getElementById("root"))```
This is an declarative way of coding…
While as the same code to be written in vanilla javascript involves many lines of code

```
Const h1 = document.createElement(“h1”);
h1.textContent= “Hello World”
document.getElementById(‘root’).append(h1)
```

With this approach even if we add more elements you can see how many lines of code are going to be added and how complex the things would be.
