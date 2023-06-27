
  import React, { useState } from 'react';
  import Header from './Header';
  import Footer from './Footer';
  import { Navigate } from 'react-router-dom';
  import { useSelector } from 'react-redux';
  
  function UserPage() {
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    const [isModalOpen, setModalOpen] = useState(false);
    const [newUserName, setNewUserName] = useState('');
  
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
        const response = await fetch('http://localhost:3001/api/v1/user/profile', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            // Ajoutez les headers nécessaires, tels que le token d'authentification
          },
          body: JSON.stringify({ userName: newUserName }), // newUserName est la nouvelle valeur du nom d'utilisateur
        });
  
        if (response.ok) {
          // La mise à jour a réussi, vous pouvez effectuer les actions nécessaires (par exemple, fermer la modale)
          closeModal();
        } else {
          // La mise à jour a échoué, vous pouvez gérer l'erreur ici
          console.error('Failed to update user name');
        }
      } catch (error) {
        // Une erreur s'est produite lors de la requête, vous pouvez la gérer ici
        console.error('Error updating user name', error);
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
              <h2>Change User Name</h2>
              <form id='modalform'>
                <label htmlFor="newUserName">New User Name:</label>
                <input
                  type="text"
                  id="newUserName"
                  value={newUserName}
                  onChange={handleUserNameChange}
                />
                <button className="edit-button" type="button" onClick={updateUserName}>
                  Save
                </button>
                <button className="edit-button" type="button" onClick={closeModal}>
                  Cancel
                </button>
              </form>
            </div>
          </div>
        )}
      <Header isAuthenticated={isAuthenticated} isUserPage={true} />
        <main className="main bg-dark">
          <div className="header">
            <h1>Welcome back<br />Tony Jarvis!</h1>
            <button className="edit-button" onClick={openModal}>
              Edit Name
            </button>         
             </div>
          <h2 className="sr-only">Accounts</h2>
          <section className="account">
            <div className="account-content-wrapper">
              <h3 className="account-title">Argent Bank Checking (x8349)</h3>
              <p className="account-amount">$2,082.79</p>
              <p className="account-amount-description">Available Balance</p>
            </div>
            <div className="account-content-wrapper cta">
              <button className="transaction-button">View transactions</button>
            </div>
          </section>
          <section className="account">
            <div className="account-content-wrapper">
              <h3 className="account-title">Argent Bank Savings (x6712)</h3>
              <p className="account-amount">$10,928.42</p>
              <p className="account-amount-description">Available Balance</p>
            </div>
            <div className="account-content-wrapper cta">
              <button className="transaction-button">View transactions</button>
            </div>
          </section>
          <section className="account">
            <div className="account-content-wrapper">
              <h3 className="account-title">Argent Bank Credit Card (x8349)</h3>
              <p className="account-amount">$184.30</p>
              <p className="account-amount-description">Current Balance</p>
            </div>
            <div className="account-content-wrapper cta">
              <button className="transaction-button">View transactions</button>
            </div>
          </section>
        </main>
        <Footer />
      </body>
    </html>
  );
}

export default UserPage;
