/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useEffect, useRef } from "react";
import { FaInstagram, FaYoutube } from "react-icons/fa";
import "./About.css";
import { Helmet } from "react-helmet";
import LoadingBar from 'react-top-loading-bar';

const About = () => {
  const loadingBarRef = useRef(null);

  useEffect(() => {
    loadingBarRef.current.continuousStart();
    setTimeout(() => {
      loadingBarRef.current.complete();
    }, 500); // Simulate loading time
  }, []);

  return (
    <div>
      <LoadingBar color="#ff0000" height="4px" ref={loadingBarRef} />
      <section className="about-us">
      <Helmet>
      <title>About Us - JKHub Movies</title>
        <meta
          name="description"
          content="JKHub Movies, jkhub online, jkhub online movie, jkhub online Movies download, jkhub.online, JKHub, Download Latest Bollywood And Hollywood Movies, Netflix and Amazon Prime Series"
        />
      </Helmet>
        <div className="main-us">
          <img src="favicon.ico" alt="My Photo" />
          <div className="abt-text">
            <h1 className="h1-heading">
              About <span>Us</span>
            </h1>
            <p>
              "JKHub Movies: Your go-to for the latest movies and series.
              Explore a vast library, seamless navigation, and join a community
              of fellow enthusiasts. Start your cinematic journey today!" <br /> <br /> <span>
              If there are any website issues or unavailable movies and series, DM us on Instagram. <br />
              ( किसी भी वेबसाइट समस्या या अनुपलब्ध फिल्मों और सीरीज के लिए, हमें इंस्टाग्राम पर DM करें। )
              </span>
            </p>
            <a
              href="https://www.instagram.com/jkhub_site?igsh=MTZ1NGNsenJycjVvdA==" target="_blank"
              className="connectbtn" rel="noreferrer"
            >
              Connect with me!
            </a>

            <div className="connect-section">
              <div className="social-icons">
                <a
                  href="https://www.instagram.com/jkhub_site?igsh=MTZ1NGNsenJycjVvdA=="
                  target="_blank"
                  rel="noreferrer"
                >
                  <FaInstagram />
                </a>
                <a
                  href="https://youtube.com/@jk_ringtone?si=x1SLCV8VngaYW4n6"
                  target="_blank"
                  rel="noreferrer"
                >
                  <FaYoutube />{" "}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
