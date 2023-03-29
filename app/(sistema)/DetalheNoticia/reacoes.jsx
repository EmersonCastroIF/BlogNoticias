'use client'

import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faThumbsUp, faThumbsDown } from '@fortawesome/free-solid-svg-icons'


export default function Reacoes({ likes, dislikes }) {
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);
  const [likeCount, setLikeCount] = useState(likes);
  const [dislikeCount, setDislikeCount] = useState(dislikes);

  function handleLikeClick() {
    if (!liked) {
      setLiked(true);
      setLikeCount(likeCount + 1);
      if (disliked) {
        setDisliked(false);
        setDislikeCount(dislikeCount - 1);
      }
    }
    else{
      setLiked(false);
      setLikeCount(likeCount - 1);      
    }
  }

  function handleDislikeClick() {
    if (!disliked) {
      setDisliked(true);
      setDislikeCount(dislikeCount + 1);
      if (liked) {
        setLiked(false);
        setLikeCount(likeCount - 1);
      }
    }
    else{
      setDisliked(false);
      setDislikeCount(dislikeCount - 1);      
    }
  }

  return (
    <>
      <button onClick={handleLikeClick} style={{ marginRight: "0.20cm" }}>
        <FontAwesomeIcon icon={faThumbsUp} /> {likeCount}
      </button>

      <button onClick={handleDislikeClick}>
        <FontAwesomeIcon icon={faThumbsDown} /> {dislikeCount}
      </button>
    </>
  )}