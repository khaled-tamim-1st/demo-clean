async function test() {
  console.log('--- Testing Next.js Pages and Endpoints ---');

  // Test 1: Service page
  const serviceRes = await fetch('http://localhost:3000/services/cockroaches');
  const serviceHtml = await serviceRes.text();
  console.log('GET /services/cockroaches status:', serviceRes.status);
  console.log('  Has canonical tag:', serviceHtml.includes('rel="canonical" href="https://democleankw.com/services/cockroaches"'));
  console.log('  Has content-sidebar-layout:', serviceHtml.includes('content-sidebar-layout'));
  console.log('  Has JSON-LD schema:', serviceHtml.includes('application/ld+json') && serviceHtml.includes('PestControl'));

  // Test 2: Coverage governorate & area
  const govRes = await fetch('http://localhost:3000/coverage/hawalli');
  const govHtml = await govRes.text();
  console.log('GET /coverage/hawalli status:', govRes.status);
  console.log('  Has content-sidebar-layout:', govHtml.includes('content-sidebar-layout'));

  const areaRes = await fetch('http://localhost:3000/coverage/hawalli/salmiya');
  const areaHtml = await areaRes.text();
  console.log('GET /coverage/hawalli/salmiya status:', areaRes.status);
  console.log('  Has canonical tag:', areaHtml.includes('rel="canonical" href="https://democleankw.com/coverage/hawalli/salmiya"'));
  console.log('  Has content-sidebar-layout:', areaHtml.includes('content-sidebar-layout'));

  // Test 3: Contact page
  const contactRes = await fetch('http://localhost:3000/contact');
  const contactHtml = await contactRes.text();
  console.log('GET /contact status:', contactRes.status);
  console.log('  Has two-col-layout:', contactHtml.includes('two-col-layout'));

  // Test 4: About page
  const aboutRes = await fetch('http://localhost:3000/about');
  const aboutHtml = await aboutRes.text();
  console.log('GET /about status:', aboutRes.status);
  console.log('  Has stats-four-grid:', aboutHtml.includes('stats-four-grid'));

  // Test 5: POST /api/contact - Valid submission
  const validContact = {
    name: 'عبدالله الكندري',
    phone: '99887766',
    governorate: 'hawalli',
    service: 'bedbugs',
    notes: 'استفسار عاجل لمكافحة البق بالحرارة',
  };
  const postRes = await fetch('http://localhost:3000/api/contact', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(validContact),
  });
  const postData = await postRes.json();
  console.log('POST /api/contact (valid) status:', postRes.status);
  console.log('  Response body:', postData);

  // Test 6: POST /api/contact - Invalid submission (too short name and missing fields)
  const invalidContact = {
    name: 'A',
    phone: '12',
  };
  const badPostRes = await fetch('http://localhost:3000/api/contact', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(invalidContact),
  });
  const badPostData = await badPostRes.json();
  console.log('POST /api/contact (invalid) status:', badPostRes.status);
  console.log('  Rejection message:', badPostData.message);

  console.log('--- Verification Complete ---');
}

test().catch(console.error);
