info = {
  update: true,
  hash: 'ltBtYJ0RDe1v7lX7UDHsM5XJg-bJ',
  name: '0.0.48.1',
  description: 'test',
  metaInfo: '',
  updateUrl:
    'https://update-packages.reactnative.cn/ltBtYJ0RDe1v7lX7UDHsM5XJg-bJ?e=1561443224&token=made75kGFhOozkiRfa7LK_E1xG1pLOnhW8fhbnev:hv1ERnZ6AR76opfYLUuZDjMSh8k=',
  pdiffUrl:
    'https://update-packages.reactnative.cn/ln1SvJchr_FFU4VquJXdPHTVBcNf-ltBtYJ0RDe1v7lX7UDHsM5XJg-bJ.pdiff?e=1561443224&token=made75kGFhOozkiRfa7LK_E1xG1pLOnhW8fhbnev:ohYYzXmlBk7tubS9Ll1GxL3xo-w=',
  ok: 1,
}

try {
  const metaInfoObj = JSON.parse(info.metaInfo)
  console.log(metaInfoObj)
} catch (error) {}
