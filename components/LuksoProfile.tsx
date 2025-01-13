import { useEffect, useState } from 'react';
import { ERC725 } from '@erc725/erc725.js';
import erc725schema from '@erc725/erc725.js/schemas/LSP3ProfileMetadata.json';

const IPFS_GATEWAY = 'https://api.universalprofile.cloud/ipfs/';
const RPC_ENDPOINT = 'https://4201.rpc.thirdweb.com';

interface LuksoProfileProps {
    address: string;
}

export function LuksoProfile({ address }: LuksoProfileProps) {
    const [profileImgUrl, setProfileImgUrl] = useState<string>(
        'https://tools-web-components.pages.dev/images/sample-avatar.jpg'
    );
    const [fullName, setFullName] = useState<string>('');
    const [profileBackground, setProfileBackground] = useState<string>('');
    useEffect(() => {
        async function fetchProfileImage() {
            if (!address) return;

            try {
                const config = { ipfsGateway: IPFS_GATEWAY };
                const profile = new ERC725(erc725schema, address, RPC_ENDPOINT, config);
                const fetchedData = await profile.fetchData('LSP3Profile');
                if (
                    fetchedData?.value &&
                    typeof fetchedData.value === 'object' &&
                    'LSP3Profile' in fetchedData.value
                ) {
                    const profileImagesIPFS = fetchedData.value.LSP3Profile.profileImage;
                    const fullName = fetchedData.value.LSP3Profile.name;
                    const profileBackground = fetchedData.value.LSP3Profile.backgroundImage;
                    console.log("LSP3Profile", fetchedData.value.LSP3Profile);
                    console.log("fullName", fullName);
                    setFullName(fullName);
                    if (profileImagesIPFS?.[0]?.url) {
                        const imageUrl = profileImagesIPFS[0].url.replace('ipfs://', IPFS_GATEWAY);
                        setProfileImgUrl(imageUrl);
                    }
                    if (profileBackground?.[0]?.url) {
                        const backgroundUrl = profileBackground[0].url.replace('ipfs://', IPFS_GATEWAY);
                        setProfileBackground(backgroundUrl);
                    }
                }

            } catch (error) {
                console.error('Error fetching profile image:', error);
            }
        }

        fetchProfileImage();
    }, [address]);

    return (
        <div>
            <lukso-card
                variant="profile"
                background-url={profileBackground}
                profile-url={profileImgUrl}
                width={320}
                height={200}
                shadow="large"
            >
                <div slot="content" className="p-6">
                    <lukso-username
                        name={fullName}
                        address={address}
                        size="large"
                        max-width="200"
                    ></lukso-username>
                </div>
            </lukso-card>
        </div>
    );
} 
