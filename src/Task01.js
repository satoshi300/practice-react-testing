import React from 'react';
import LoginForm from './components/LoginForm';

const Task01 = () => {
    function tryAuth(login, password) {
        return login.length + password.length > 6;
    }

    return (
        <section>
            <h1>Task01</h1>
            <LoginForm tryAuth={ tryAuth }/>
        </section>
    );
};

export default Task01;