import React, {useState} from "react";
import classes from './FlipCard.module.css'

const FlipCard = ({children, ...props}) => {
    return (
        <div className={classes.flipcard}>
  <div className={classes.flipcardinne}>
    <div className={classes.flipcardfront}>
      <h1>Hi!</h1>
    </div>
    <div className={classes.flipcardback}>
      <h1>John Doe</h1>
      <p>Architect & Engineer</p>
      <p>We love that guy</p>
    </div>
  </div>
</div>
    )
}
export default FlipCard;