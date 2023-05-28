import React from 'react';
import Button from './Button';
import { useRouter } from 'next/router';

import { useX } from '../context/xContext';
import Styles from '../styles/button.module.scss';
import Styles2 from '../styles/containers.module.scss';
import FadeChildren from './FadeChildren';
import CalculateIcon from '../assets/svg/calculateIcon';
import EqualIcon from '../assets/svg/equalIcon';
import RemoveIcon from '../assets/svg/RemoveIcon';
import ClearIcon from '../assets/svg/clearIcon';
import DeleteIcon from '../assets/svg/deleteIcon';
import BookmarkIcon from '../assets/svg/bookmarkIcon';
import SendIcon from '../assets/svg/sendIcon';
import ShareIcon from '../assets/svg/shareIcon';

const MethodButtons = (props) => {
  const { setSaved, saved, showMsg } = useX();
  const router = useRouter();

  // const generateQueryList = () => {
  //   const queryList = [];
  //   for (const key in router.query) {
  //     if (key !== 'operation') {
  //       if (key === 'condition') {
  //         const condition = JSON.parse(router.query[key]);
  //         console.log(router.query[key]);
  //         queryList.push(`▶${condition.type} = ${condition.value}`);
  //       } else queryList.push(`▶${key} = ${router.query[key]}`);
  //     }
  //   }
  //   return queryList;
  // };

  const copyLink = async () => {
    const URL = window.location.href;
    if ('clipboard' in navigator) {
      await navigator.clipboard.writeText(URL);
      showMsg('success', 'Solution Link Copied 😉');
    } else {
      document.execCommand('copy', true, URL);
      showMsg('success', 'Solution Link Copied 😉');
    }
    // const title = 'Numerical Analysis Mini Project';
    // const text = 'Solution Link Copied 😉';

    // const msg = generateQueryList() + '\n\n Made with 🤍 by anaszarqawi';

    // try {
    //   await navigator.share({ title, msg, url: URL });
    //   showMsg('success', 'Shared successfully');
    // } catch (error) {
    //   showMsg('error', 'Error sharing: ' + error);
    //   showMsg('success', msg);
    // }
  };

  return (
    <div
      className={Styles.buttons_container}
      data-aos="fade-up"
      data-aos-duration="400"
      data-aos-delay={props['data-aos-delay'] ? props['data-aos-delay'] : '0'}
      data-aos-once="true">
      {/* <div className={Styles2.flexRowCenter}> */}
      <Button label="Calculate" icon={<CalculateIcon />} type="submit" value="calculate" isPrimary={true} />
      <Button label="Clear" icon={<ClearIcon />} type="reset" />

      <Button
        label="Save"
        icon={<BookmarkIcon />}
        type="button"
        onClick={() => props.calculate({ operation: 'save' })}
      />
      {/* </div> */}
      {router.query.operation === 'calculateQuery' && (
        <Button label="Share Solution" icon={<ShareIcon />} type="button" onClick={copyLink} isNew={true} />
      )}
    </div>
  );
};

export default MethodButtons;
