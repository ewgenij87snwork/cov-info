// Кратчайшим путем до продакшина! Надо продолжать учебу! Страницы about, notFound, home.
// Первая версия продакшена -- мобильная: строчка навигации, строчка поиска и результат по одной стране.
// Вторая версия: строчка поиска + 4 страны сразу в колонку + десктопная версия
// Третья версия: + две строчки статистики по полтавско области и любушскому воеводству

import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Home from './components/pages/Home';
import About from './components/pages/About';
import NotFound from './components/pages/NotFound';
import Alert from './components/layout/Alert';
import AlertState from './components/context/alert/AlertState';
import './App.css';
import CovState from './components/context/cov/CovState';

const App = () => {
  return (
    <CovState>
      <AlertState>
        <Router>
          <div className='App'>
            <Navbar />
            <div className='container'>
              <Alert />
              <Switch>
                <Route exact path='/' component={Home} />
                <Route exact path='/about' component={About} />
                <Route component={NotFound} />
              </Switch>
            </div>
          </div>
        </Router>
      </AlertState>
    </CovState>
  );
};

export default App;
