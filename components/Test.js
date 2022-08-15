// import data from "@emoji-mart/data";
// import Picker from "@emoji-mart/react";

// export function Test() {
//   return <Picker data={data} onEmojiSelect={console.log} />;
// }

import React from "react";

function Test({ post }) {
  console.log("post from text", post);
  return (
    <div className="text-white">
      {post.map((element) => {
        // <Post key={post.id} id={post.id} post={post} />;
        // <p>{element}</p>;
        // console.log("post inside Test statement", element);
        var x = element.text;
        console.log("value of x : ", x);
        <p>x</p>;
      })}
    </div>
  );
}

export default Test;
