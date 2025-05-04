/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useEffect, useRef } from "react";
import "./Desclaimer.css";
import { Helmet } from "react-helmet";
import LoadingBar from 'react-top-loading-bar';

const Desclaimer = () => {
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
      <Helmet>
        <title>DMCA - JKHub Movies</title>
        <meta
          name="description"
          content="JKHub Movies, jkhub online, jkhub online movie, jkhub online Movies download, jkhub.online, JKHub, Download Latest Bollywood And Hollywood Movies, Netflix and Amazon Prime Series"
        />
      </Helmet>

      <div className="left">
        <h1 className="jkhubdmca">jkhub.site DMCA Policy</h1>
        <h4 style={{ color: "red" }}>DMCA Information</h4>
        <p>
          <i>
            All parts of the downloadhub.in website are for private use only.
            <br />
            No files are hosted on our server, <br />
            All contents are provided by non-affiliated third parties. <br />
            they are only indexed much like how Google works. <br />
            downloadhub.in does not accept responsibility for content hosted on
            third party websites and does not have any involvement in the
            downloading/uploading of movies. we just post links available on the
            internet.
            <br /> <br />
            This site merely indexes other sites’ contents. The hosting server
            or the administrator cannot be held responsible for the contents of
            any linked sites or any link contained in a linked site, or changes
            / updates to such sites. All materials on this website are for
            Educational Purposes ONLY.
            <br /> <br />
            For any copyright issues, you should contact the hosters files
            sites itself
            <br /> <br />
            If you still have or need further information <br />
            please send me PM through the contact page <br />
            <br /> <br />
            Please allow 3-7 business days for an email response.{" "}
            <b>
              <a
                href="https://www.instagram.com/jkhub_site?igshid=MTZ1NGNsenJycjVvdA=="
                target="_blank"
                rel="noreferrer"
              >
                [Contact Us - Instagram]
              </a>{" "}
              [Mail - <span>rockybhaiass999@gmail.com </span>]
            </b>
          </i>
        </p>
      </div>
    </div>
  );
};

export default Desclaimer;
