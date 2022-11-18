import React, { useEffect, useState, useRef } from 'react';

function Memory(props) {
    
    const BACKFACE_CARD = 'https://scooli.com/wp-content/uploads/2019/03/Spirit_Logo_Beitragsbild.png';
    const MEMORY_CARDS = [
      'https://www.made-by-glueckskaefer.de/images/product_images/original_images/20200512_111905.jpg',
      'https://cdn.ravensburger.de/images/produktseiten/1024/27794_1.jpg',
      'https://mytoys.scene7.com/is/image/myToys/ext/20726652-02.jpg',
      'https://images2.medimops.eu/product/47129a/M0B07GRVW16R-source.jpg',
      'https://images-eu.ssl-images-amazon.com/images/I/71m0n-JG0lS._AC_UL160_SR160,160_.jpg',
      'https://m.media-amazon.com/images/I/71eaH7z6YoL._SX355_.jpg',
      'https://i.etsystatic.com/35332396/r/il/b3c602/3835806336/il_340x270.3835806336_6nze.jpg',
      'https://i.etsystatic.com/13760563/r/il/c4da03/3545704716/il_fullxfull.3545704716_7u5l.jpg'
    ];

    let openedCard = useRef(false);
    let freezeGame = useRef(false);
    let [cards, setCards] = useState({
        firstCard: null,
        secondCard: null
    });

    function openCard(e) {
        const cardNode = e.target.parentNode;
        if(freezeGame.current){
            return;
        }
            
        if(cardNode === cards.firstCard) 
            return;
        cardNode.classList.add('flip');

        if(!openedCard.current){
            openedCard.current = true;
            setCards((currentState) =>
            ({
                secondCard: currentState.secondCard,
                firstCard: cardNode
            }));
            return;
        }

        setCards((currentState) =>
            ({
                firstCard: currentState.firstCard,
                secondCard: cardNode
            }));
    }

    function removeCardEvent() {
        cards.firstCard.removeEventListener('click', openCard);
        cards.secondCard.removeEventListener('click', openCard);
        reset();
    }

    function closeCards() {
        freezeGame.current = true;

        setTimeout( () => {
            cards.firstCard.classList.remove('flip');
            cards.secondCard.classList.remove('flip');
            reset();
        }, 1500);
        
    }

    function reset(){
        freezeGame.current = false;
        openedCard.current = false;
        setCards({
            firstCard: null,
            secondCard: null
        });
    }


    useEffect(() => {
        let cards = document.querySelectorAll('.card');
        cards.forEach(card => {
            const randomNum = Math.floor(Math.random() * cards.length);
            card.style.order = randomNum;
        });
    },[])

    useEffect(() => {
        if(cards.firstCard && cards.secondCard) {
            (cards.firstCard.dataset.horse === cards.secondCard.dataset.horse) ? removeCardEvent() : closeCards();
        }
    },[cards.firstCard, cards.secondCard])
    
    return (<>
        <h2>Spirit Memory</h2>
        <section className="memory">
        {
          MEMORY_CARDS.map((card, index) => {
            return (
                <>
                    <div key={`${index}_1`} className="card" data-horse={`horse${index}`} onClick={openCard}>
                        <img key={`${index}_front_1`} className="frontside" src={card} alt={`horse${index}`} />
                        <img key={`${index}_back_1`} className="backside" src={BACKFACE_CARD} alt="Spirit Memory Game" />
                    </div>
                    <div key={`${index}_2`} className="card" data-horse={`horse${index}`} onClick={openCard}>
                        <img key={`${index}_front_2`} className="frontside" src={card} alt={`horse${index}`} />
                        <img key={`${index}_back_2`} className="backside" src={BACKFACE_CARD} alt="Spirit Memory Game" />
                    </div>
                </>
            )
            })
          }
      </section>
      </>
    );
}

export default Memory;