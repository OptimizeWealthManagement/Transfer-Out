import 'core-js/stable';
import 'regenerator-runtime/runtime';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import ErrorBoundary from './components/ErrorBoundary';

const targetModules = document.querySelectorAll('[type="application/json"]');
targetModules.forEach(({ dataset, textContent }) => {
  const root = document.getElementById(
    `cms-react-boilerplate__App--${dataset.moduleInstance}`,
  );
  return ReactDOM.render(
    <ErrorBoundary>
      <App
        portalId={dataset.portalId}
        moduleData={JSON.parse(textContent)}
        moduleInstance={dataset.moduleInstance}
      />
    </ErrorBoundary>,
    root,
  );
});
