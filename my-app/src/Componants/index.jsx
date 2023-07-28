import React from 'react';
import Header from './Header';
import Footer from './Footer';
import FeatureItem from './FeatureItem';
import { useSelector } from 'react-redux';
import iconchat from './img/icon-chat.webp';
import iconmoney from './img/icon-money_1.webp';
import iconsecurity from './img/icon-security.webp';


function HomePage() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);  
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
      <Header isAuthenticated={isAuthenticated} isUserPage={false} />
        <main>
          <div className="hero">
            <section className="hero-content">
              <h2 className="sr-only">Promoted Content</h2>
              <p className="subtitle">No fees.</p>
              <p className="subtitle">No minimum deposit.</p>
              <p className="subtitle">High interest rates.</p>
              <p className="text">Open a savings account with Argent Bank today!</p>
            </section>
          </div>
          <section className="features">
      <h2 className="sr-only">Features</h2>
      <FeatureItem
        iconSrc={iconchat}
        title="You are our #1 priority"
        description="Need to talk to a representative? You can get in touch through our 24/7 chat or through a phone call in less than 5 minutes."
      />
      <FeatureItem
        iconSrc={iconmoney}
        title="More savings means higher rates"
        description="The more you save with us, the higher your interest rate will be!"
      />
      <FeatureItem
        iconSrc={iconsecurity}
        title="Security you can trust"
        description="We use top of the line encryption to make sure your data and money is always safe."
      />
    </section>
        </main>
        <Footer />
      </body>
    </html>
  );
}

export default HomePage;
