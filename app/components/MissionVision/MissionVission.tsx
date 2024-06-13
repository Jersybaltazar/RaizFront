import React from 'react';

const styles = `
  .mission-vision-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 20px;
    background-color: #f0f0f0;
  }

  @media (min-width: 768px) {
    .mission-vision-container {
      flex-direction: row;
      justify-content: space-around;
    }
  }

  .card {
    perspective: 1000px;
    width: 100%;
    max-width: 300px;
    margin: 10px;
    height: 300px;
    background: #ffffff;
    border-radius: 15px;
    box-shadow: 0 10px 20px rgba(0,0,0,0.1);
    transform-style: preserve-3d;
    transition: transform 0.5s;
  }

  .card:hover {
    transform: rotateY(20deg) rotateX(10deg);
  }

  .card-content {
    padding: 20px;
    text-align: center;
    transform-style: preserve-3d;
  }

  .card-title {
    font-size: 24px;
    margin-bottom: 20px;
    color: #333;
    font-weight: bold;
  }

  .card-text {
    font-size: 16px;
    color: #666;
  }
`;

const MisionVision: React.FC = () => {
  return (
    <>
      <style>{styles}</style>
      <div className="mission-vision-container">
        <div className="card mission">
          <div className="card-content">
            <h2 className="card-title">Misión</h2>
            <p className="card-text">
              Nuestra misión es proporcionar servicios inmobiliarios de alta calidad,
              facilitando la compra, venta y alquiler de propiedades, asegurando la satisfacción
              total de nuestros clientes.
            </p>
          </div>
        </div>
        <div className="card vision">
          <div className="card-content">
            <h2 className="card-title">Visión</h2>
            <p className="card-text">
              Ser la inmobiliaria líder en el mercado, reconocida por nuestra integridad,
              innovación y excelencia en el servicio al cliente.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default MisionVision;