import React from 'react'
import './About.css'

const About = () => {
    return (
        <>
            <div className="container-fluid">
                <img className="about_img" src="https://media.istockphoto.com/vectors/a-person-leaves-a-good-online-review-for-a-product-or-service-vector-vector-id1249627377?k=20&m=1249627377&s=612x612&w=0&h=ROayPZvw6c32iP-GP6I8qyhgL2-6eTrIdZ46ykUSux8=" alt="" />

                <div className="about_info">

                    <h3 className="header1">What is Leitner system ?</h3>
                    <p><span>The Leitner system</span> is a widely used method of efficiently using flashcards that was proposed by the German science journalist Sebastian Leitner in the 1970s.It is a simple implementation of the principle of spaced repetition, where cards are reviewed at increasing intervals.</p>

                    <br></br><br></br>



                    <h3 className="header1">Add cards / quizzes</h3>
                    <p>To add cards or quizes you can go to the "Manage" section from the navbar, and then add quizes or cards</p>

                    <br></br><br></br>

                    <h3 className="header1">About this project : </h3>
                    <p><span>Leitner</span> is a free and open source piece of software which allows users to create flashcards and create quizes from these flashcards, and then study those quizzes. It is based on the Leitner studying system of spaced repetition.
                        Leitner is built using Typescript,Javascript MongoDB, React, Express and Node.</p>
                    <br />

                    <p className="contribute" style={{ fontSize: "1.2rem" }}>
                        Feel free to contribute here : <a href="https://github.com/JRIngram/leitner" style={{ textDecoration: "none", fontSize: "1rem", fontWeight: "600" }}>Leitner</a> ,
                        And do give us a ⭐ <br />
                        <footer>
                            Made with ❤ by <a href="https://github.com/JRIngram" style={{ textDecoration: "none" }}>J. Ingram</a>
                        </footer>
                    </p>
                </div>


            </div>
        </>
    )
}

export default About
