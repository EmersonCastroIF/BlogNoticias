'use client'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faThumbsUp as faThumbsUpRegular, faThumbsDown as faThumbsDownRegular } from '@fortawesome/free-regular-svg-icons'
import { faThumbsUp, faThumbsDown } from '@fortawesome/free-solid-svg-icons'
import { MessageCallbackContext } from '../layout';
import { useState, useContext } from 'react';


export default function Reacoes({ usuarioId, noticiaId, likes, dislikes }) {
  const [liked, setLiked] = useState(true);
  const [disliked, setDisliked] = useState(false);
  const [likeCount, setLikeCount] = useState(likes);
  const [dislikeCount, setDislikeCount] = useState(dislikes);
  const messageCallback = useContext(MessageCallbackContext);


  const ReacoesAction = (ParamLiked, ParamDeslike) => {
    const url = '/api/Reacoes'
    const data = { usuarioId: usuarioId, noticiaId: noticiaId, like: ParamLiked, deslike: ParamDeslike };
    var args = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    };

    fetch(url, args).then((result) => {
      if (result.status === 200) {
        result.json().then((resultData) => {
          messageCallback({ tipo: 'sucesso', texto: resultData });
        })
      }
      else {
        messageCallback({ tipo: 'erro', texto: result.statusText });;
      }
    });    
  }

  function handleLikeClick() {
    if (!liked) {
      setLiked(true);
      setLikeCount(likeCount + 1);
      ReacoesAction(true,false)
      if (disliked) {
        setDisliked(false);
        setDislikeCount(dislikeCount - 1);
      }
    }
    else {
      setLiked(false);
      setLikeCount(likeCount - 1);
    }

    console.log("liked = " + liked);
    console.log("disliked = " + disliked);  

  }
  
  function handleDislikeClick() {

    if (!disliked) {
      setDisliked(true);
      setDislikeCount(dislikeCount + 1);
      ReacoesAction(false,false)
      if (liked) {
        setLiked(false);
        setLikeCount(likeCount - 1);
      }
    }
    else {
      setDisliked(false);
      setDislikeCount(dislikeCount - 1);
    }

    console.log("liked = " + liked);
    console.log("disliked = " + disliked);      
  }

  return (
    <>
      <div className="d-inline-block mx-3">
        <FontAwesomeIcon onClick={handleLikeClick} icon={liked ? faThumbsUp : faThumbsUpRegular} /> {likeCount}
      </div>
      <div className="d-inline-block mx-3">
        <FontAwesomeIcon onClick={handleDislikeClick} icon={disliked ? faThumbsDown : faThumbsDownRegular} /> {dislikeCount}
      </div>
    </>
  )
}