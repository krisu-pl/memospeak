import React, { Component } from 'react'
import { Layout, Row, Col } from 'antd'
import { StepsContainer } from './components/steps'
import AppHeader from './components/AppHeader'
import AppFooter from './components/AppFooter'

import diff from './helpers/diff'

const { Content } = Layout

const TEMP_RECORDING = 'Biega pan Hilary Gdzie są moje zgubione gdzieś okulary? Szuka w spodniach i w surducie W lewym naprawde lewym bucie w prawym dłucie..'

class App extends Component {
  constructor (props) {
    super(props)

    this.state = {
      original: 'Biega krzyczy pan Hilary Gdzie są moje okulary? Szuka w spodniach i w surducie W prawym bucie w lewym bucie..',
      transcript: TEMP_RECORDING,
      diff: '',
      language: 'en-US'
    }
  }

  compare = () => {
    this.setState({
      diff: diff(this.state.original, this.state.transcript),
    })
  }

  saveTranscript = (transcript) => {
    this.setState({transcript}, this.compare);
  }

  saveOriginal = (original) => {
    this.setState({ original })
  }

  modifyDiff = ({ id, value }) => {
    const diff = [
      ...this.state.diff.slice(0, id),
      value,
      ...this.state.diff.slice(id + 1, this.state.diff.length)
    ]
    this.setState({ diff })
  }

  changeLanguage = (language) => {
    this.setState({ language })
  }

  render () {
    return (
      <Layout>
        <AppHeader />
        <Content className='content'>
          <Row gutter={16}>
            <Col span={24} xs={{ span: 24 }} md={{ offset: 2, span: 20 }} lg={{ offset: 5, span: 14 }}>
              <StepsContainer
                original={this.state.original}
                transcript={this.state.transcript}
                diff={this.state.diff}
                modifyDiff={this.modifyDiff}
                saveOriginal={this.saveOriginal}
                onResult={this.saveTranscript}
                language={this.state.language}
                changeLanguage={this.changeLanguage}
              />
            </Col>
          </Row>
        </Content>
        <AppFooter />
      </Layout>
    )
  }
}

export default App
