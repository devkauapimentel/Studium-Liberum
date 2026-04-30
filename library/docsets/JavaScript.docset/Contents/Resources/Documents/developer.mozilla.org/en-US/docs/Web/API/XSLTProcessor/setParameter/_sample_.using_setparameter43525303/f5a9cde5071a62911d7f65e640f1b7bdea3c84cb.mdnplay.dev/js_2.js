
          const xmlString = `
<items>
  <item>Item 1</item>
  <item>Item 2</item>
  <item>Item 3</item>
</items>
`;

const xsltString = `
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
  <xsl:param name="showItems" select="'yes'"/>
  <xsl:param name="highlightColor" select="'yellow'"/>
  <xsl:template match="/">
    <ul>
      <xsl:if test="$showItems = 'yes'">
        <xsl:for-each select="items/item">
          <li style="background-color: {$highlightColor};">
            <xsl:value-of select="."/>
          </li>
        </xsl:for-each>
      </xsl:if>
    </ul>
  </xsl:template>
</xsl:stylesheet>
`;

const parser = new DOMParser();
const xmlDoc = parser.parseFromString(xmlString, "application/xml");
const xsltDoc = parser.parseFromString(xsltString, "application/xml");

const xsltProcessor = new XSLTProcessor();
xsltProcessor.importStylesheet(xsltDoc);

xsltProcessor.setParameter(null, "showItems", "yes");
xsltProcessor.setParameter(null, "highlightColor", "lightblue");

// Perform the transformation from XML to HTML
const resultFragment = xsltProcessor.transformToFragment(xmlDoc, document);

// Display the transformed result in the page
document.getElementById("result").appendChild(resultFragment);
;
        