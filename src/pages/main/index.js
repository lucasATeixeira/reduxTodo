import React, { useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { Creators as FavoriteActions } from '../../store/ducks/favorites';

const Main = ({ favorites, addFavoriteRequest }) => {
  const [repoInput, setRepoInput] = useState();
  const handleAddRepo = (e) => {
    e.preventDefault();
    addFavoriteRequest(repoInput);
    setRepoInput('');
  };
  return (
    <>
      <form onSubmit={handleAddRepo}>
        <input
          type="text"
          placeholder="usuário/repo"
          value={repoInput}
          onChange={e => setRepoInput(e.target.value)}
        />
        <button type="submit">Adicionar</button>
        {favorites.loading && <span>Carregando</span>}
        {!!favorites.err && <span style={{ color: '#f00' }}>{favorites.err}</span>}
      </form>

      <ul>
        {favorites.data.map(favorite => (
          <li key={favorite.id}>
            <p>
              <strong>{favorite.name}</strong> {favorite.description}
            </p>
            <a href={favorite.url}>Acessar</a>
          </li>
        ))}
      </ul>
    </>
  );
};

Main.propTypes = {
  addFavoriteRequest: PropTypes.func.isRequired,
  favorites: PropTypes.shape({
    loading: PropTypes.bool,
    err: PropTypes.oneOfType([null, PropTypes.string]),
    data: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string,
        description: PropTypes.string,
        url: PropTypes.string,
      }),
    ),
  }).isRequired,
};

const mapStateToProps = state => ({
  favorites: state.favorites,
});

const mapDispatchToProps = dispatch => bindActionCreators(FavoriteActions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Main);
