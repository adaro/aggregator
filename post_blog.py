#No shebang line. File is meant to be imported

####
#This file acts as our server class used to parse the RSS feed
#and calculate bit_rate and video_compression. This class is also
#responsible for building the final dictionary of items
####

import pytumblr
import pprint

#python libs
import pprint
import urllib2
from xml.etree import ElementTree as etree

class TumblrNprRssFeed(object):
	"""
	Server class used to parse
	RSS feed and build dictionary
	"""
	def __init__(self):
		#initialization method used to create instance vars
		self.items, self.images = self.fetch_item()
		self.entry_list = self.loop_items(self.items, self.images)

	def return_list(self):
		#method simply returns instace var
		return self.entry_list

	def __calculate_bit_rate(self, dict_item):
		#private method for calculating bit rate
		#bit rate is the filesize divided by the duration
		#I hope my math is correct here :) please don't hold it
		#against me if it is not. I have never calculated bit rate before
		#but Google had some clever insight on how it might be calculated.
		bit_rate = int(dict_item["fileSize"]) / int(dict_item["duration"])
		return bit_rate

	def __calculate_video_compression(self, dict_item):
		#private method for calculating video compression
		#video compression is the uncompressed filesize divided by the filesize
		#again I hope my math is correct here :) please don't hold it
		#against me if it is not. This one was really hard to find, I even asked
		#StackOverflow, but no no avail.
		uncompressed = int(dict_item["width"]) * int(dict_item["height"]) * int(dict_item["duration"])
		video_compression = float(uncompressed)/float(dict_item["fileSize"])
		return video_compression

	def fetch_item(self):
		#Data Layer for fetching RSS feed
		wd_xml = urllib2.urlopen('http://www.npr.org/rss/rss.php?id=1001')
		#convert to string:
		xml_data = wd_xml.read()
		#close file so that we don't hit an open file
		#handle limit if this code were to run long
		wd_xml.close()
		#entire feed
		xml_root = etree.fromstring(xml_data)
		#find all items
		items = xml_root.findall('channel/item')
                images = xml_root.findall('channel/image')
		return items, images

	def loop_items(self, item, image):
		#method used to loop over items, create dict and append to list
		entries = list()
		for entry in item:

                    xml_feed_dict=dict()
                    children =  entry.getchildren()
                    for i in children:
                        tag = entry.findall(i.tag)
                        for i in tag:
                            xml_feed_dict[i.tag] = i.text

                    for img in image:
    			img_children =  img.getchildren()
                        for i in img_children:
                            tag = img.findall(i.tag)
                            for i in tag:
                                if not i.tag == "title":
                                    xml_feed_dict[i.tag] = i.text
                    entries.append(xml_feed_dict)
                import pprint
                pprint.pprint(entries)

		return entries


 # Authenticate via OAuth
client = pytumblr.TumblrRestClient(
  '', # Client keys here
  '',
  '',
  ''
)

def post_tmblr():
  trssf = TumblrNprRssFeed()
  for i in trssf.entry_list:
      print type(i['title']), type(i['link']),
      try:
          if type(i["description"]) == 'unicode':
              i["description"] = "Not Avail"
              client.create_photo('<user>.tumblr.com', state="published", tags=
  						["npr", "news"], caption=i['title'], link=i['link'], source=i['url'])
          else:
              client.create_photo('<user>.tumblr.com', state="published", tags=
  						["npr", "news"], caption=i['title'], link=i['link'], source=i['url'])
      except Exception, error:
              print error
  #Create a link post
  #client.create_link('alexdaro.tumblr.com', title=i['title'], url=i['link'], description=i["description"])
  #print p
 
