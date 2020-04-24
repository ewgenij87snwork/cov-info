// Кратчайшим путем до продакшина! Надо продолжать учебу! Страницы about, notFound, home.
// Первая версия продакшена -- мобильная: строчка навигации, строчка поиска и результат по одной стране.
// Вторая версия: строчка поиска + 4 страны сразу в колонку + десктопная версия
// Третья версия: + две строчки статистики по полтавско области и любушскому воеводству

import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';

const App = () => {
  return (
    <Router>
      <div className='App'>
        <Navbar />
        <div className='container'>
          <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path='/about' component={About} />
            <Route component={NotFound} />}
          </Switch>
        </div>
      </div>
    </Router>
  );
};

export default App;
