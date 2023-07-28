import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Header from './Header';
import Footer from './Footer';
import AccountSection from './Account';
import { Navigate } from 'react-router-dom';
import { updateUsername } from '../authAction';

function UserPage() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const username = useSelector((state) => state.auth.username);
  const [isModalOpen, setModalOpen] = useState(false);
  const [newUserName, setNewUserName] = useState('');
  const dispatch = useDispatch();

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const handleUserNameChange = (event) => {
    setNewUserName(event.target.value);
  };

  const updateUserName = async () => {
    try {
      let token = localStorage.getItem('token');

      const response = await fetch('http://localhost:3001/api/v1/user/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ userName: newUserName }),
      });

      if (response.ok) {
        // La mise à jour a réussi, vous pouvez effectuer les actions nécessaires (fermer la modal, etc.)
        dispatch(updateUsername(newUserName)); // Mettez à jour le nom d'utilisateur dans le store Redux avec la nouvelle valeur
        closeModal();
      } else {
        console.error('Échec de la mise à jour du nom d\'utilisateur');
      }
    } catch (error) {
      console.error('Erreur lors de la mise à jour du nom d\'utilisateur', error);
    }
  };

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return (
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Argent Bank - Home Page</title>
        <link rel="stylesheet" href="./css/main.css" />
        <link
          rel="stylesheet"
          href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"
        />
        
      </head>
      <body>
        {isModalOpen && (
          <div className="modal">
            <div className="modal-content">
              <h2>Changer le nom d'utilisateur</h2>
              <form id='modalform'>
                <label htmlFor="newUserName">Nouveau nom d'utilisateur :</label>
                <input
                  type="text"
                  id="newUserName"
                  value={newUserName}
                  onChange={handleUserNameChange}
                />
                <button className="edit-button" type="button" onClick={updateUserName}>
                  Sauvegarder
                </button>
                <button className="edit-button" type="button" onClick={closeModal}>
                  Annuler
                </button>
              </form>
            </div>
          </div>
        )}
        <Header isAuthenticated={isAuthenticated} isUserPage={true} />
        <main className="main bg-dark">
          <div className="header">
            <h1>Bienvenue de retour<br />{username}</h1>
            <button className="edit-button" onClick={openModal}>
              Modifier le nom
            </button>
          </div>
          <h2 className="sr-only">Comptes</h2>
          <div>
            <AccountSection
              title="Argent Bank Checking (x8349)"
              amount="$2,082.79"
              description="Solde disponible"
            />
            <AccountSection
              title="Argent Bank Savings (x6712)"
              amount="$10,928.42"
              description="Solde disponible"
            />
            <AccountSection
              title="Argent Bank Credit Card (x8349)"
              amount="$184.30"
              description="Solde actuel"
            />
          </div>
        </main>
        <Footer />
      </body>
    </html>
  );
}

export default UserPage;
