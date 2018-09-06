import React from 'react';

import PDFReader from 'rn-pdf-reader-js';
import shorthash from 'shorthash';
import { FileSystem } from 'expo';

export default class CachePdf extends React.Component {

    state = {
        source: null
    }

    componentDidMount = async () => {
        const { uri } = this.props;
        const name = shorthash.unique(uri);
        console.log(name);
        const path = `${FileSystem.cacheDirectory} ${name}`;
        const pdf = await FileSystem.getInfoAsync(path);
        if (pdf.exists) {
            console.log('read Pdf from cache');
            this.setState({
                source:{
                    uri: pdf.uri,
                }
            })
            return;
        }

        console.log('downloading pdf to cache');
        const newPdf = await FileSystem.downloadAsync(uri, path);
        this.setState({
            source: {
                uri: newPdf.uri,
            }
        })
    }

    render(){
        return(
            <PDFReader style={this.props.style}
                source={this.state.source}
            />
        )
    }
}