<?php
namespace OroCRM\Bundle\ContactBundle\Form\Type;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\OptionsResolver\OptionsResolverInterface;

class ContactSelectType extends AbstractType
{
    public function setDefaultOptions(OptionsResolverInterface $resolver)
    {
        $resolver->setDefaults(
            array(
                'configs' => array(
                    'placeholder' => 'orocrm.contact.form.choose_contact',
                    'result_template_twig' => 'OroFormBundle:Autocomplete:fullName/result.html.twig',
                    'selection_template_twig' => 'OroFormBundle:Autocomplete:fullName/selection.html.twig'
                ),
                'autocomplete_alias' => 'contacts',
                'grid_name' => 'contacts-select-grid',
                'create_form_route' => 'orocrm_contact_create'
            )
        );
    }

    public function getParent()
    {
        return 'oro_entity_create_or_select_inline';
    }

    /**
     * {@inheritdoc}
     */
    public function getName()
    {
        return 'orocrm_contact_select';
    }
}
