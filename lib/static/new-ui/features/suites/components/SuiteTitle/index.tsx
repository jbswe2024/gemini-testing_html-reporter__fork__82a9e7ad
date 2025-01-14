import React, {ReactNode} from 'react';
import {connect} from 'react-redux';
import {State} from '@/static/new-ui/types/store';
import {ClipboardButton, Flex} from '@gravity-ui/uikit';
import {ChevronRight} from '@gravity-ui/icons';

import styles from './index.module.css';
import classNames from 'classnames';

interface SuiteTitleProps {
    className?: string;
}

interface SuiteTitlePropsInternal extends SuiteTitleProps {
    suitePath: string[];
}

function SuiteTitleInternal(props: SuiteTitlePropsInternal): ReactNode {
    return <Flex wrap={true}>
        <h2 className={classNames('text-display-1', styles.heading, props.className)}>
            {props.suitePath.map((item, index) => (
                <span key={index} className={styles.titlePartWrapper}>
                    {item}
                    {index !== props.suitePath.length - 1 ?
                        <div className={styles.separator}><ChevronRight /><span className={styles.invisibleSpace}>&nbsp;</span></div> :
                        <ClipboardButton className={styles.copyButton} text={props.suitePath.join(' ')} view={'flat'} size={'s'} />}
                </span>
            ))}
        </h2>
    </Flex>;
}

export const SuiteTitle = connect((state: State) => {
    let suitePath: string[] = [];
    const browserId = state.app.currentSuiteId;

    if (browserId && state.tree.browsers.byId[browserId]) {
        const browserName = state.tree.browsers.byId[browserId].name;
        const suiteId = state.tree.browsers.byId[browserId].parentId;

        suitePath = [...state.tree.suites.byId[suiteId].suitePath, browserName];
    }

    return {suitePath};
})(SuiteTitleInternal);
