
          const xmlString1 = `
<items>
  <item>Item A</item>
  <item>Item B</item>
</items>
`;

const xsltString1 = `
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
  <xsl:template match="/">
    <ul>
      <xsl:for-each select="items/item">
        <li><xsl:value-of select="."/></li>
      </xsl:for-each>
    </ul>
  </xsl:template>
</xsl:stylesheet>
`;

const xmlString2 = `
<fruits>
  <fruit>Apple</fruit>
  <fruit>Banana</fruit>
</fruits>
`;

const xsltString2 = `
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
  <xsl:template match="/">
    <ol>
      <xsl:for-each select="fruits/fruit">
        <li><xsl:value-of select="."/></li>
      </xsl:for-each>
    </ol>
  </xsl:template>
</xsl:stylesheet>
`;

const parser = new DOMParser();
const xmlDoc1 = parser.parseFromString(xmlString1, "application/xml");
const xsltDoc1 = parser.parseFromString(xsltString1, "application/xml");
const xmlDoc2 = parser.parseFromString(xmlString2, "application/xml");
const xsltDoc2 = parser.parseFromString(xsltString2, "application/xml");

const xsltProcessor = new XSLTProcessor();

// Import the first XSLT stylesheet and transform the first XML
xsltProcessor.importStylesheet(xsltDoc1);
let resultFragment = xsltProcessor.transformToFragment(xmlDoc1, document);
document.getElementById("result").appendChild(resultFragment);

// Reset the XSLTProcessor instance
xsltProcessor.reset();

// Import the second XSLT stylesheet and transform the second XML
xsltProcessor.importStylesheet(xsltDoc2);
resultFragment = xsltProcessor.transformToFragment(xmlDoc2, document);
document.getElementById("result").appendChild(document.createElement("hr"));
document.getElementById("result").appendChild(resultFragment);
;
        