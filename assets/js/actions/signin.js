'use strict';

import request from 'superagent';
import validator from 'validator';
import Message from '../components/message';
import { error } from '../common/tools';

const signIn = (opts) => {
  $('.sign-in form [name="username"]').on('keyup', (evt) => {
    let $target = $(evt.currentTarget);
    let newVal = $target.val().replace(/\s/, '');
    $target.val(newVal);
  });
	$('.sign-in form').on('submit', (evt) => {
    evt.preventDefault();
    let $target = $(evt.currentTarget);
    let $username = $target.find('[name="username"]');
    let $password = $target.find('[name="password"]');
    let $submit = $target.find('[type="submit"]');
    if (validator.isNull($username.val())) {
      $username.focus();
      return Message(null, '用户名/电子邮件不能为空', () => null);
    }
    if (validator.isNull($password.val())) {
      $password.focus();
      return Message(null, '密码不能为空', () => null);
    }
    let $btn = $submit.button('loading');
    request
      .post('/signin')
      .send({ 
        username: $username.val(), 
        password: $password.val() 
      })
      .set('Accept', 'application/json')
      .end( (err, res) => {
        // Calling the end function will send the request
        if (err) {
          setTimeout( () => {
            $password.focus();
            Message(null, error(1000).message + '1: ' + err.message, () => $btn.button('reset') );
          }, 500);
          return false;
        }
        if (res.statusCode !== 200) {
          setTimeout( () => {
            $password.focus();
            Message(null, error(1000).message + '2: ' + res.statusText, () => $btn.button('reset') );
          }, 500);
          return false;
        } 
        if (res.body.code > 0) {
          setTimeout( () => {
            $password.focus();
            Message(null, error(res.body.code).message, () => $btn.button('reset') );
          }, 500);
          return false;
        }
        console.log(res.body.data);
        window.location.reload();
      });
  });
}

export default signIn;